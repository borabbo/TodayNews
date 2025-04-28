import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { articles } = req.body;
    const summaries = [];

    for (const article of articles) {
      const prompt = `다음 뉴스 기사의 내용을 3-4문장으로 구체적으로 요약해 주시기 바랍니다.
      요약 시 다음 사항을 반드시 포함해 주세요:
      1. 기사의 핵심 주제와 중요성
      2. 주요 내용과 의미
      3. 관련된 영향이나 향후 전망
      
      문장은 반드시 '~습니다', '~입니다'로 자연스럽게 끝나도록 작성해 주세요.
      (예시: '~할 전망입니다', '~되었습니다', '~예상됩니다')
      '~입니다'라는 텍스트를 별도로 추가하지 마세요.

      제목: ${article.title}
      카테고리: ${article.category}
      키워드: ${article.author.name}`;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      summaries.push({
        title: article.title,
        link: article.link,
        summary: completion.choices[0].message.content.trim(),
      });
    }

    res.status(200).json({ summaries });
  } catch (error) {
    console.error('Error summarizing articles:', error);
    res.status(500).json({ message: 'Error summarizing articles' });
  }
} 