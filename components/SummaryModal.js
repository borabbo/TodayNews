import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const SummaryModal = ({ isOpen, onClose, summaryData }) => {
  const [isPublishing, setIsPublishing] = useState(false);

  if (!isOpen) return null;

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const today = new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\. /g, '-').replace('.', '');

      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `의료기기 Daily 뉴스 요약 : ${today}`,
          summaries: summaryData,
          date: today,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to publish report');
      }

      alert('리포트가 성공적으로 발행되었습니다.');
      onClose();
    } catch (error) {
      console.error('Error publishing report:', error);
      alert('리포트 발행 중 오류가 발생했습니다.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">뉴스 요약 리포트</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isPublishing ? '발행 중...' : '발행하기'}
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {summaryData.map((item, index) => (
          <div key={index} className="mb-8 pb-6 border-b last:border-b-0">
            <h3 className="text-lg font-semibold mb-2">
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {item.title}
              </a>
            </h3>
            <p className="text-gray-700 whitespace-pre-line">{item.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryModal; 