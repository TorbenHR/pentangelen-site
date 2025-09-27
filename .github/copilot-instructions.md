# Copilot Instructions for pentangelen-site

## Project Overview
This is a React + Vite project with minimal setup, using HMR (Hot Module Replacement), ESLint, Tailwind CSS, and PostCSS. The codebase is structured for rapid prototyping and simple static site deployment.

## Key Files & Structure
- `src/` — Main source code. Entry point is `main.jsx`. App component in `App.jsx`.
- `public/` — Static assets (favicon, images).
- `index.html` — Vite HTML entry.
- `vite.config.js` — Vite configuration.
- `tailwind.config.cjs` & `postcss.config.cjs` — CSS tooling configs.
- `eslint.config.js` — Linting rules.

## Build & Development Workflow
- **Start dev server:** `npm run dev` (Vite, HMR enabled)
- **Build for production:** `npm run build`
- **Preview production build:** `npm run preview`
- **Lint:** `npm run lint` (uses ESLint config)

## Patterns & Conventions
- **React functional components** only; no class components.
- **CSS:** Use Tailwind utility classes in JSX. Global styles in `index.css` and `App.css`.
- **Assets:** Import images from `src/assets/` or reference from `public/`.
- **No TypeScript** by default; see README for migration.
- **Minimal routing:** No React Router or advanced state management unless added explicitly.

## Integration Points
- **Vite plugins:** See `vite.config.js` for plugin usage (e.g., React plugin).
- **ESLint:** Configured via `eslint.config.js`.
- **Tailwind/PostCSS:** Configured via respective `.cjs` files.

## Example: Adding a Component
1. Create `src/components/MyComponent.jsx`:
   ```jsx
   export default function MyComponent() {
     return <div className="p-4 text-lg">Hello!</div>;
   }
   ```
2. Import and use in `App.jsx`:
   ```jsx
   import MyComponent from './components/MyComponent';
   // ...
   <MyComponent />
   ```

## Tips for AI Agents
- Follow the functional React + Tailwind pattern.
- Reference config files for build/lint details.
- Use Vite's fast refresh for local development.
- Keep code minimal and readable; avoid over-engineering.

---
If any conventions or workflows are unclear, please ask for clarification or examples from the codebase.
