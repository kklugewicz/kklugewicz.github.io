# Kyle Klugewicz — Personal Website

Static site (plain HTML/CSS/JS, no build step) hosted on GitHub Pages.

## Structure
```
index.html              Home: hero, about, project + experience synopsis, contact
projects/<slug>.html    One page per project
experience/<slug>.html  One page per role
style.css               All styling
site.js                 Nav + dropdowns, footer, prev/next links, hero animation, lightbox
assets/img/             Photos and figures (web-optimized)
assets/favicon.svg
.nojekyll               Serve files as-is (no Jekyll processing)
```

## Common edits
- **Change text:** edit the page's HTML directly.
- **Add a project:** copy an existing file in `projects/`, change `data-page="..."` on `<body>` to the new filename (without `.html`), then add an entry to `SITE.projects` in `site.js`. The nav dropdown and prev/next links update automatically. Add a tile on `index.html` too.
- **Add a role:** same, under `experience/` and `SITE.experience`.
- **Contact links:** `SITE` block at the top of `site.js` (email, LinkedIn, GitHub, résumé path).
- **Images:** put them in `assets/img/`, ideally ≤1800px on the long side.

## Preview locally
```
python3 -m http.server 8000
```
Then open http://localhost:8000

## Deploy (one-time setup)
1. Create a **public** repo on GitHub named exactly `<username>.github.io`.
2. From this folder:
   ```
   git init -b main
   git add .
   git commit -m "Initial site"
   git remote add origin https://github.com/<username>/<username>.github.io.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.
4. Wait ~1 minute, then visit `https://<username>.github.io`.

## Updating
Edit files → `git add . && git commit -m "..." && git push`. Changes go live in about a minute.
