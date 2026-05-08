export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({
error: "Method not allowed"
});
}

try {

const { question } = req.body;

if (!question) {
return res.status(400).json({
error: "Question is required"
});
}

const response = await fetch("https://api.openai.com/v1/responses", {
method: "POST",
headers: {
"Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
"Content-Type": "application/json"
},
body: JSON.stringify({
model: "gpt-4.1-mini",
max_output_tokens: 120,
input: [
{
role: "system",
content:
"You are a UPSC AI Mentor for Testbook. Answer only UPSC-related questions in 4-5 short lines. Do not mention competitor websites, coaching institutes, YouTube channels, or external links."
},
{
role: "user",
content: question
}
]
})
});

const data = await response.json();

const answer =
data.output_text ||
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
