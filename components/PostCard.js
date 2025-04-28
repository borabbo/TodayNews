import { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/24/outline/index.js';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid/index.js';

const PostCard = ({ post, featured = false }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // URL 미리보기 이미지 생성 (microlink.io 사용)
  const previewUrl = `https://api.microlink.io?url=${encodeURIComponent(post.link)}&screenshot=true&meta=false&embed=screenshot.url`;

  useEffect(() => {
    // 로컬 스토리지에서 즐겨찾기 상태 확인
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some(fav => fav.link === post.link));
  }, [post.link]);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      // 즐겨찾기 제거
      const newFavorites = favorites.filter(fav => fav.link !== post.link);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      // 즐겨찾기 추가
      favorites.push(post);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      <div 
        className={`relative group cursor-pointer ${featured ? 'col-span-2' : ''}`} 
        onClick={() => window.open(post.link, '_blank')}
      >
        <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex justify-between items-start mb-3">
              <span className="inline-block px-3 py-1 text-sm bg-blue-600 rounded-full">
                {post.author.name}
              </span>
              <button
                onClick={toggleFavorite}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                {isFavorite ? (
                  <StarIconSolid className="h-6 w-6 text-yellow-400" />
                ) : (
                  <StarIcon className="h-6 w-6 text-white" />
                )}
              </button>
            </div>
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="text-sm text-gray-200">{post.category}</p>
            <div className="flex items-center mt-4 space-x-2">
              <span className="text-sm">{post.date}</span>
              <span>·</span>
              <span className="text-sm">{post.publisher}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 뉴스 미리보기 팝오버 */}
      {showPreview && (
        <div 
          className="absolute z-50 left-full ml-4 top-0 w-[600px] bg-white rounded-lg shadow-2xl overflow-hidden"
          style={{ maxHeight: 'calc(100vh - 100px)' }}
        >
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 bg-gray-100">
              <img
                src={previewUrl}
                alt="Website Preview"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute top-0 left-0 right-0 h-8 bg-white/90 backdrop-blur-sm border-b flex items-center px-4">
              <span className="text-sm font-medium truncate flex-1">{post.title}</span>
              <a 
                href={post.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 ml-2"
                onClick={(e) => e.stopPropagation()}
              >
                원문 보기 →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard; 