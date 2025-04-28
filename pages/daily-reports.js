import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function DailyReports() {
  const router = useRouter();
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    if (router.query.reportId && reports.length > 0) {
      const report = reports.find(r => r.id === router.query.reportId);
      if (report) {
        setSelectedReport(report);
      }
    }
  }, [router.query.reportId, reports]);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/reports');
      if (!response.ok) throw new Error('Failed to fetch reports');
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Daily Reports</h1>
        
        {selectedReport ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{selectedReport.title}</h2>
              <button
                onClick={() => {
                  setSelectedReport(null);
                  router.replace('/daily-reports', undefined, { shallow: true });
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                목록으로 돌아가기
              </button>
            </div>
            {selectedReport.summaries.map((item, index) => (
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
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">제목</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 w-32">작성일</th>
                  <th className="px-6 py-3 w-20"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr
                    key={report.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setSelectedReport(report);
                      router.push(
                        {
                          pathname: '/daily-reports',
                          query: { reportId: report.id }
                        },
                        undefined,
                        { shallow: true }
                      );
                    }}
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {report.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
} 