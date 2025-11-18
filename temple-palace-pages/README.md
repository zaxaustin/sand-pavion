# Temple Palace — GitHub Pages Prototype

This is a **static visual model** of the Sand Pavilion you can host on **GitHub Pages**.  
It includes a portal and four rooms:
- `/meditation/` — Meditation & Scripture (copied from your current HTML)
- `/wellness/` — Wellness Pavilion (mock)
- `/community/` — Community Courtyard (mock)
- `/ai/` — AI Village (mock)

## Host on GitHub Pages

1. Create a new **public** repo on GitHub (or enable Pages on a private one).
2. Upload the contents of this folder to the repo root (or push via git).
3. Go to **Settings → Pages** and set:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (root)
4. Wait for Pages to publish. Your site will be available at:
   `https://<username>.github.io/<repo>/`

Routes:
- `/` → Portal
- `/meditation/`, `/wellness/`, `/community/`, `/ai/`

> This build has **no backend**; it’s for showcasing the concept.  
> To run the full stack (API, DB, agents), use the Docker setup from the monorepo.

## Local preview
Just open `index.html` in a browser, or serve locally:

```bash
python -m http.server 8080
# open http://localhost:8080
```

## Next steps
- Replace mock pages with your React/Vite builds later
- Keep `/meditation/` updated from your live HTML
- Add assets under `/assets/` (shared CSS, images, audio)
