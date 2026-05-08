export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a UPSC AI Mentor for Testbook. Answer only UPSC-related questions in 4-5 short lines. Do not mention coaching institutes, competitors, YouTube channels, external websites, or videos. If the question is not related to UPSC, politely say you can help only with UPSC preparation."
          },
          {
            role: "user",
            content: question
          }
        ],
        max_tokens: 120,
        temperature: 0.5
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        answer: "OpenAI API error: " + (data.error?.message || "Unknown error")
      });
    }

    return res.status(200).json({
      answer: data.choices[0].message.content
    });

  } catch (error) {
    return res.status(500).json({
      answer: "Server error. Please check Vercel logs."
    });
  }
}
