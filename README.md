# Satyanarayanan Rajasekaran — Portfolio Website

A recruiter-focused, responsive React portfolio built with Vite. The content is tailored to business analysis, project controls, and technology project delivery experience.

## Included
- Responsive home, about, experience, projects, skills, and contact sections
- Interactive project case-study panels
- Resume PDF linked from the site (`public/resume.pdf`)
- Mobile navigation and responsive layout
- No external API keys or backend required

## Run locally

Requirements: Node.js LTS and npm.

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal (usually `http://localhost:5173`).

## Build and test the production version

```bash
npm run build
npm run preview
```

Vite outputs the production site to `dist/`.

## Publish to GitHub

Create an empty repository on GitHub, then run these commands from this folder (replace `YOUR_USERNAME`):

```bash
git init
git add .
git commit -m "Build professional portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

## Deploy on Vercel

1. Sign in to Vercel using GitHub.
2. Import the repository.
3. Vercel should detect Vite automatically.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy. Future pushes to the connected branch will trigger deployments.

## Personalise before publishing

- Review every achievement and metric for accuracy and be ready to explain how each was measured.
- The project summaries intentionally avoid internal RBC system details, sensitive data, screenshots, and proprietary artefacts.
- Replace `public/resume.pdf` if you update your resume.
- Confirm the email and LinkedIn URLs in `src/App.jsx`.
- Add public GitHub project links only for code or case studies you are comfortable sharing. No project repository links are fabricated in this starter.

## Tech stack
React · Vite · CSS · Lucide icons
