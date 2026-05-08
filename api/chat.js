export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const { question } = req.body;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a UPSC AI Mentor for Testbook. Answer only UPSC-related questions in 4-5 short lines. Do not mention coaching institutes, competitors, YouTube channels, or external links."
            },
            {
              role: "user",
              content: question
            }
          ],
          max_tokens: 120,
          temperature: 0.7
        })
      }
    );

    const data = await response.json();

    const answer =
      data.choices?.[0]?.message?.content ||
      "Sorry, I could not answer right now.";

    return res.status(200).json({
      answer
    });

  } catch (error) {

    return res.status(500).json({
      error: "Server error"
    });

  }
}
