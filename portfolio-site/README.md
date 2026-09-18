# Profile Website — Wahyu Panji Sugiantoro

Next.js + Tailwind + pdf.js. Structure:

- `lib/profile.ts` — all your resume content (summary, experience, education, certifications, conferences, skills). Edit this file's text directly to update your profile.
- `components/ProfilePhoto.tsx` — the circular photo in the hero; shows your initials until a photo is added.
- `public/profile-photo.jpg` — put your photo here (see `public/ADD-YOUR-PHOTO-HERE.txt`).
- `data/publications.json` — your publications list (this is the simple "database"). Add entries with the command below rather than editing this by hand.
- `data/pdfs/` — put the actual PDF files here (must match the `"file"` field in publications.json). Deliberately outside `/public` so PDFs don't have a direct URL.
- `app/api/pdf/[slug]/route.ts` — the only way to fetch a PDF's bytes; reads from `data/pdfs/` and streams it to the viewer.
- `components/PdfViewer.tsx` — renders the PDF to `<canvas>` via pdf.js (not the native browser viewer), plus a watermark and blocked Ctrl+S/Ctrl+P/right-click.
- `app/page.tsx`, `app/publications/page.tsx`, `app/publications/[slug]/page.tsx` — the site's pages.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Adding a publication (no code editing needed)

1. Drag your PDF into `data/pdfs/`.
2. Run:
   ```bash
   npm run add-publication
   ```
3. Answer the prompts (pick the PDF, title, year, category, summary). Done — it's added to `data/publications.json` automatically.

## Editing your profile text

Open `lib/profile.ts` and edit the text directly — name, summary, experience bullets, education, certifications, conferences, skills. Save, and the site updates automatically while `npm run dev` is running.

## Adding your photo

Drag a photo named `profile-photo.jpg` into the `public/` folder. See `public/ADD-YOUR-PHOTO-HERE.txt` for details.

## Deploy for free on Vercel

1. Push this project to a new GitHub repo (`git init`, `git add .`, `git commit`, `git push`).
2. Go to https://vercel.com and sign up with your GitHub account.
3. "Add New Project" → select this repo → Deploy. Vercel auto-detects it as a Next.js project.
4. You'll get a free subdomain: `your-project.vercel.app`.

## Custom domain (optional)

1. Buy a domain (Cloudflare Registrar / Namecheap, usually $8–15/year for `.com`).
2. In the Vercel dashboard: Project → Settings → Domains → enter your domain.
3. Vercel gives you DNS instructions (usually a nameserver change or a CNAME/A record) — follow them in your registrar's dashboard.
4. HTTPS turns on automatically once DNS propagates (usually under an hour).

## Note on PDF protection

This isn't absolute protection — anyone who can VIEW a file in a browser
can, in principle, save it some other way (screenshot, etc.). What's
built here is a reasonable deterrent: no native browser download/print
button, no direct PDF URL, and a watermark as a trace.
