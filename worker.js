export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    if (request.method !== "POST") {
      return json({ error: "Only POST requests are allowed." }, 405);
    }

    try {
      const { question } = await request.json();

      if (!question || question.length > 300) {
        return json({ error: "Please ask a valid UPSC question under 300 characters." }, 400);
      }

      const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          max_output_tokens: 120,
          input: [
            {
              role: "system",
              content:
                "You are Testbook UPSC AI Mentor. Answer only UPSC, civil services, exam strategy, syllabus, current affairs, polity, history, geography, economy, environment, ethics and essay related questions. Keep every answer within 4-5 short lines. Do not mention competitor websites, coaching institutes, YouTube channels, paid courses, external links, or videos. Do not promote any brand other than Testbook. If the question is unrelated to UPSC, politely say you can help only with UPSC preparation."
            },
            {
              role: "user",
              content: question
            }
          ]
        })
      });

      const data = await openaiResponse.json();

      if (!openaiResponse.ok) {
        return json({ error: "AI Mentor is temporarily unavailable." }, 500);
      }

      const answer =
        data.output_text ||
        data.output?.[0]?.content?.[0]?.text ||
        "Sorry, I could not generate an answer.";

      return json({ answer: limitLines(answer, 5) }, 200);
    } catch (error) {
      return json({ error: "Something went wrong. Please try again." }, 500);
    }
  }
};

function limitLines(text, maxLines) {
  return text
    .split(/\n+/)
    .map(line => line.trim())
    .filter(Boolean)
    .slice(0, maxLines)
    .join("\n");
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(),
      "Content-Type": "application/json"
    }
  });
}
