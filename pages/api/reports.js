// 메모리에 데이터를 저장할 전역 변수
let reports = [];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const report = {
        id: Date.now().toString(),
        ...req.body,
        createdAt: new Date().toISOString(),
      };

      // 새 리포트를 배열 맨 앞에 추가
      reports.unshift(report);
      
      // 최대 100개까지만 저장
      if (reports.length > 100) {
        reports = reports.slice(0, 100);
      }

      res.status(200).json(report);
    } catch (error) {
      console.error('Error saving report:', error);
      res.status(500).json({ message: 'Error saving report' });
    }
  } else if (req.method === 'GET') {
    try {
      res.status(200).json(reports);
    } catch (error) {
      console.error('Error reading reports:', error);
      res.status(500).json({ message: 'Error reading reports' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} 