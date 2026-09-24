# The Engineering Post

A developer portfolio styled as a weathered newspaper. Astro (static) + GSAP + Sanity.

## Run

```bash
npm install
npm run dev
```

Without Sanity credentials the site renders from `src/data/fallback.ts`, so it works out of the box.

## Connect Sanity

1. Create a project at sanity.io/manage and copy its project ID.
2. Copy `.env.example` to `.env` and set `PUBLIC_SANITY_PROJECT_ID` (and `PUBLIC_SANITY_DATASET`).
3. Start the Studio:

```bash
cd studio
cp .env.example .env
npm install
npm run dev
```

4. Optionally load the starter content: `npm run seed` inside `studio/`.
5. Add `http://localhost:3333` (and your deployed Studio URL) as CORS origins in Sanity. The site itself fetches at build time, so it needs no CORS entry.

Once a project ID is set, **all content comes from Sanity only** — the fallback file is ignored.

## Controlling sections from the CMS

`Site settings → Sections` has a switch for About, Experience, Projects, Tools of the trade, From the lab and Contact.
Turning one off removes the section from the front page, its entry in the navigation, and its standalone page
(`/about`, `/experience`, `/projects/*`). A section with no content is hidden automatically too.

## Content model

| Document | Fields |
| --- | --- |
| `siteSettings` (singleton) | name, role, publication, tagline, hero lines, intro, portrait, bio, notes, email, GitHub, LinkedIn, resume, contact headline, stack, lab, sections |
| `project` | title, slug, category, headline, description, year, role, featured, order, technologies, cover image, gallery, problem, approach, implementation, results, lessons, GitHub, live URL |
| `experience` | company, role, start/end date, location, description, surfaces, technologies, achievements |

Experience `surfaces` (web, mobile, api, data, ai) feed the "One engineer. Multiple surfaces." ledger.

## Deploying

The site is fully static (`npm run build` → `dist/`). Add a Sanity webhook that triggers a rebuild on your host
(Vercel, Netlify, Cloudflare Pages) when content is published.

## Structure

```
src/
  components/newspaper    Masthead, Nav, Stamp, Figure, Caption, Plate, ArticleHeader, NewspaperBorder, Footer
  components/experience   ExperienceItem, WebMobileVisual
  components/projects     ProjectStory, ProjectFigure
  components/sections     Hero, About, Experience, Projects, Stack, Lab, Contact
  components/animations   motion (loader), Reveal, Parallax, HorizontalScroll
  layouts                 BaseLayout, ArticleLayout
  pages                   index, about, experience, projects/index, projects/[slug], 404
  lib                     sanity, queries, content, types
  styles                  global, typography, newspaper, animations
studio/                   Sanity Studio (schemas, singleton structure, seed data)
```

## Performance notes

- Static HTML; the only client JS is the motion bundle, loaded on idle and skipped entirely with `prefers-reduced-motion`.
- Page-load sequence is pure CSS; scroll reveals toggle classes so transitions run on the compositor.
- Sanity images are served as AVIF/WebP via `auto=format` with responsive `srcset`, intrinsic sizes and LQIP backgrounds (no CLS).
- Fonts are self-hosted (latin subsets) with the two primary faces preloaded.
- Parallax distances are reduced on small screens; the horizontal Lab section only pins on large viewports.
