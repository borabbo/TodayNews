import Link from 'next/link';
import { useRouter } from 'next/router';

const Navigation = ({ onSectionChange, activeSection }) => {
  const router = useRouter();

  const handleClick = (e, section) => {
    e.preventDefault();
    if (router.pathname !== '/') {
      // 메인 페이지가 아니면 메인으로 이동하면서 hash 변경
      router.push(`/#${section}`);
    } else if (onSectionChange) {
      onSectionChange(section);
      window.location.hash = `#${section}`;
    }
  };

  return (
    <nav className="border-b">
      <div className="max-w-screen-xl mx-auto px-4">
        <ul className="flex space-x-8">
          <li>
            <a
              href="#google-news"
              onClick={(e) => handleClick(e, 'google-news')}
              className={`inline-block py-4 text-sm font-medium hover:text-blue-600 border-b-2 ${
                activeSection === 'google-news' ? 'border-blue-600 text-blue-600' : 'border-transparent'
              } transition-colors`}
            >
              Google News
            </a>
          </li>
          <li>
            <a
              href="#naver-news"
              onClick={(e) => handleClick(e, 'naver-news')}
              className={`inline-block py-4 text-sm font-medium hover:text-blue-600 border-b-2 ${
                activeSection === 'naver-news' ? 'border-blue-600 text-blue-600' : 'border-transparent'
              } transition-colors`}
            >
              Naver News
            </a>
          </li>
          <li>
            <Link
              href="/favorites"
              className="inline-block py-4 text-sm font-medium hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-colors"
            >
              Favorite
            </Link>
          </li>
          <li>
            <Link
              href="/daily-reports"
              className="inline-block py-4 text-sm font-medium hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-colors"
            >
              Daily Reports
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation; 