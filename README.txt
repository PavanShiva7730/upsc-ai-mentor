UPSC AI Mentor - Testbook

Files:
1. index.html
   - Host this on GitHub Pages.
   - Use this page inside iframe on Testbook pages.
   - Replace API_PROXY_URL with your Cloudflare Worker URL.

2. worker.js
   - Deploy this as a Cloudflare Worker.
   - Add OPENAI_API_KEY as an environment variable/secret in Cloudflare.
   - Never put the OpenAI API key in index.html.

Iframe example:
<iframe src="https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO/" width="420" height="600" style="border:0;border-radius:16px;"></iframe>

Security note:
A pure GitHub Pages HTML/CSS/JS chatbot cannot safely hide an OpenAI API key.
Use a proxy/serverless worker to avoid exposing the key publicly.
