# Roadmap

Ordered build plan. Each milestone is small enough to finish in one Claude Code session. Don't skip ahead — Phase 0 unlocks everything else.

## Milestone 1 — Repo and deploy skeleton

1. `pnpm create next-app@latest . --typescript --tailwind --app --src-dir=false --import-alias "@/*"`
2. Install: `pnpm add fuse.js @next/mdx gray-matter`
3. Add `mdx` page extension support in `next.config.mjs`.
4. Add a placeholder `app/page.tsx` that says "Aeroseal Alumni Talent Board — coming soon."
5. Push to GitHub. Connect to Vercel. Confirm the placeholder loads at the Vercel URL.

**Done when:** the Vercel URL renders the coming-soon page.

## Milestone 2 — Profile loading and one rendered profile

1. Create `lib/profiles.ts`. Load every `.mdx` file from `/content/profiles/`, parse frontmatter with `gray-matter`, validate against the schema in CLAUDE.md, and export a typed `Profile[]`.
2. Skip files starting with `_` (so `_template.mdx` isn't shipped).
3. Build `app/profile/[slug]/page.tsx` with `generateStaticParams` driven by the profile list.
4. Render every field from the data model. Use the example profile (`content/profiles/jane-doe.mdx`) as the test case.
5. Add basic Tailwind styling — readable typography, max-width container, photo top-left.

**Done when:** `/profile/jane-doe` renders all fields cleanly.

## Milestone 3 — Landing grid and filters

1. `app/page.tsx`: render all profiles as `<ProfileCard>` in a responsive grid (1 col mobile, 2 col tablet, 3 col desktop).
2. Each card shows: photo (or initials avatar), name, headline, location, top 3 skills as chips, one kudo snippet (truncated to ~120 chars), "Placed at X" badge if placed.
3. Add `<FilterBar>` with: text search (name + skills + projects), location dropdown, "looking for" toggle (any / FT / contract).
4. Wire filters via URL query params so the state is shareable.

**Done when:** filtering and searching the grid works smoothly on desktop and mobile.

## Milestone 4 — About, Submit, Contact relay

1. `app/about/page.tsx`: explains the project, names the maintainer, includes the foreword once we have it, lists the sunset date (one year from launch).
2. `app/submit/page.tsx`: explains the opt-in flow and links to the form (Tally or Google Form — David picks).
3. `app/api/contact/route.ts`: POSTs to Formspree. Rate-limited via Vercel's built-in IP throttle if needed.
4. `<ContactButton>`: opens a modal with name / email / message, hits the relay, never reveals the recipient's address.

**Done when:** a recruiter can hit "Contact Jane" and Jane gets an email through Formspree without her address being in the HTML.

## Milestone 5 — Polish and pre-launch checks

1. SEO: `<title>` per profile, OpenGraph image, sensible meta descriptions.
2. Sitemap and `robots.txt`.
3. Accessibility pass: alt text on photos, focus states on filters, semantic headings.
4. Lighthouse audit: aim for 95+ on all four scores.
5. Validate the delete-and-redeploy removal path: delete a profile file, push, confirm the page 404s and search no longer surfaces them.
6. Add a "Download all profiles as PDF" link (Phase 2 ok; punt if behind).

**Done when:** all of the above plus a manual review of every profile by the maintainer.

## Milestone 6 — Launch day

1. Final domain DNS pointed at Vercel.
2. Maintainer's LinkedIn announcement post drafted (not part of the repo).
3. Submit URL to Layoffs.fyi, Parachute, RecruitingDaily.
4. Open the opt-in form to all impacted employees.

---

## Phase 2 (only after launch is stable)

- "Placed!" counter on the landing page.
- Email digest to recruiters who opt-in (weekly new profiles).
- PDF export per profile.
- Anonymous kudos submission form.

Don't start any Phase 2 work until Milestone 6 is shipped and at least one profile has been marked placed.
