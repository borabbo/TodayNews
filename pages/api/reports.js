import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'reports.json');

// 데이터 파일이 없으면 생성
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'));
}
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([]));
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const report = {
        id: Date.now().toString(),
        ...req.body,
        createdAt: new Date().toISOString(),
      };

      const reports = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      reports.unshift(report); // 새 리포트를 배열 맨 앞에 추가
      fs.writeFileSync(dataFile, JSON.stringify(reports, null, 2));

      res.status(200).json(report);
    } catch (error) {
      console.error('Error saving report:', error);
      res.status(500).json({ message: 'Error saving report' });
    }
  } else if (req.method === 'GET') {
    try {
      const reports = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      res.status(200).json(reports);
    } catch (error) {
      console.error('Error reading reports:', error);
      res.status(500).json({ message: 'Error reading reports' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} 