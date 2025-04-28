import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const SummaryModal = ({ isOpen, onClose, summaryData }) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handlePublish = async () => {
    setIsPublishing(true);
    setError(null);

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
        const errorData = await response.json();
        throw new Error(errorData.message || '리포트 발행 중 오류가 발생했습니다.');
      }

      alert('리포트가 성공적으로 발행되었습니다.');
      onClose();
    } catch (error) {
      console.error('Error publishing report:', error);
      setError(error.message || '리포트 발행 중 오류가 발생했습니다.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">뉴스 요약</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {summaryData.map((item, index) => (
              <div key={index} className="border-b pb-4">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.summary}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                >
                  원문 보기 →
                </a>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className={`px-4 py-2 rounded ${
                isPublishing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {isPublishing ? '발행 중...' : '발행하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryModal; 