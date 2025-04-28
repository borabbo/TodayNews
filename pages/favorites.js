import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import SummaryModal from '../components/SummaryModal';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [summaryData, setSummaryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 즐겨찾기 데이터 불러오기
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleSummarize = async () => {
    if (favorites.length === 0) {
      alert('요약할 뉴스가 없습니다.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ articles: favorites }),
      });

      if (!response.ok) {
        throw new Error('Failed to summarize articles');
      }

      const data = await response.json();
      setSummaryData(data.summaries);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error:', error);
      alert('뉴스 요약 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">즐겨찾기</h1>
          <button
            onClick={handleSummarize}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? '요약 중...' : '요약하기'}
          </button>
        </div>
        
        {favorites.length === 0 ? (
          <p className="text-gray-600">즐겨찾기한 뉴스가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((post) => (
              <PostCard key={post.link} post={post} />
            ))}
          </div>
        )}

        <SummaryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          summaryData={summaryData}
        />
      </div>
    </Layout>
  );
} 