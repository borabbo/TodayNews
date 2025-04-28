import Hero from '../components/Hero';
import Navigation from '../components/Navigation';
import PostCard from '../components/PostCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [googleNewsData, setGoogleNewsData] = useState([]);
  const [naverNewsData, setNaverNewsData] = useState([]);
  const [activeSection, setActiveSection] = useState('google-news');
  const [lastUpdated, setLastUpdated] = useState(null);

  // Apps Script 웹앱 URL
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // 구글 뉴스 제목에서 언론사 추출
  const getGooglePublisher = (title) => {
    const publisherMatch = title.match(/- ([^-]+)$/);
    return publisherMatch ? publisherMatch[1].trim() : '';
  };

  // 네이버 뉴스 언론사 매핑
  const naverNewsPublishers = {
    '396': '한국경제TV',
    '421': '뉴스1',
    '030': '전자신문',
    '448': '부산일보'
  };

  // 도메인별 언론사 매핑
  const domainPublishers = {
    'kotra.or.kr': 'KOTRA',
    'hansbiz.co.kr': '한스경제',
    'newsverse.kr': '뉴스버스',
    'autodaily.co.kr': '오토데일리',
    'topstarnews.net': '톱스타뉴스'
  };

  // 네이버 뉴스 링크에서 언론사 이름 추출
  const getNaverPublisher = (link) => {
    try {
      const url = new URL(link);
      
      // 네이버 뉴스인 경우
      if (url.hostname.includes('news.naver.com')) {
        const articleMatch = url.pathname.match(/article\/(\d+)\//);
        if (articleMatch) {
          return naverNewsPublishers[articleMatch[1]] || '네이버뉴스';
        }
      }

      // 직접 링크인 경우
      const domain = url.hostname.replace('www.', '');
      return domainPublishers[domain] || domain.split('.')[0];
    } catch (e) {
      return '언론사';
    }
  };

  // 날짜 기준 내림차순 정렬 함수
  const sortByDateDesc = (a, b) => {
    return new Date(b.날짜) - new Date(a.날짜);
  };

  // 구글 뉴스 데이터 가공 함수
  const processGoogleNewsData = (item) => ({
    title: item.제목.replace(/- [^-]+$/, '').trim(),
    excerpt: `${item.키워드} - ${item.그룹}`,
    image: "https://images.unsplash.com/photo-1579033461380-adb47c3eb938",
    category: item.그룹,
    author: {
      name: item.키워드,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    date: new Date(item.날짜).toLocaleDateString(),
    rawDate: item.날짜,
    publisher: getGooglePublisher(item.제목),
    link: item.링크
  });

  // 네이버 뉴스 데이터 가공 함수
  const processNaverNewsData = (item) => ({
    title: item.제목,
    excerpt: `${item.키워드} - ${item.그룹}`,
    image: "https://images.unsplash.com/photo-1579033461380-adb47c3eb938",
    category: item.그룹,
    author: {
      name: item.키워드,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    date: new Date(item.날짜).toLocaleDateString(),
    rawDate: item.날짜,
    publisher: getNaverPublisher(item.링크),
    link: item.링크
  });

  const fetchNewsData = async () => {
    try {
      // Google News 데이터 가져오기
      const googleResponse = await fetch(`${API_URL}?source=google`);
      const googleResult = await googleResponse.json();
      if (googleResult.status === 'success') {
        const sortedData = googleResult.data
          .sort(sortByDateDesc)
          .map(processGoogleNewsData);
        setGoogleNewsData(sortedData);
      }

      // Naver News 데이터 가져오기
      const naverResponse = await fetch(`${API_URL}?source=naver`);
      const naverResult = await naverResponse.json();
      if (naverResult.status === 'success') {
        const sortedData = naverResult.data
          .sort(sortByDateDesc)
          .map(processNaverNewsData);
        setNaverNewsData(sortedData);
      }

      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchNewsData();
  }, []);

  // URL 해시 처리
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'naver-news' || hash === 'google-news') {
        setActiveSection(hash);
      } else {
        setActiveSection('google-news');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    if (!window.location.hash) {
      window.location.hash = '#google-news';
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 섹션 변경 핸들러
  const handleSectionChange = (section) => {
    setActiveSection(section);
    window.location.hash = `#${section}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Navigation onSectionChange={handleSectionChange} activeSection={activeSection} />
      
      <main className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">{activeSection === 'google-news' ? 'Google News' : 'Naver News'}</h2>
            {lastUpdated && (
              <span className="text-sm text-gray-500">
                마지막 업데이트: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
          <button
            onClick={fetchNewsData}
            className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
          >
            새로고침
          </button>
        </div>

        <section id="google-news" className={activeSection === 'google-news' ? 'block' : 'hidden'}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {googleNewsData.length > 0 ? (
              googleNewsData.map((post, index) => (
                <PostCard key={index} post={post} />
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-500">구글 뉴스를 불러오는 중입니다...</p>
            )}
          </div>
        </section>

        <section id="naver-news" className={activeSection === 'naver-news' ? 'block' : 'hidden'}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {naverNewsData.length > 0 ? (
              naverNewsData.map((post, index) => (
                <PostCard key={index} post={post} />
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-500">네이버 뉴스를 불러오는 중입니다...</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

