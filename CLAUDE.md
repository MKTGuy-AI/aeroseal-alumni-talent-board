# CLAUDE.md — Aeroseal Alumni Talent Board

This file orients Claude Code for work on this repo. Read it first, then `ROADMAP.md` for what to build next.

## What this is

An alumni-led, opt-in talent board for ~50 Aeroseal employees impacted by layoffs. Complements LinkedIn — does not replace it. Each profile features peer kudos, project highlights with proof, a "looking for" blurb, and links out. Hosted on Vercel from a GitHub repo. Maintainer: David Koerner.

**This is NOT an official Aeroseal property.** It's alumni-led with informal company acknowledgement. Keep tone professional and warm. No salary data, no internal documents, no confidential project details, nothing critical of the company.

## Stack and conventions

- **Next.js 15+ (App Router)** with TypeScript and the `/app` directory.
- **Tailwind CSS** for styling. No CSS modules, no styled-components.
- **MDX** for profile content under `/content/profiles/{slug}.mdx`. Profile frontmatter is the data model (below); MDX body is the optional long-form bio.
- **No database, no auth.** Static site only. Profiles ship as files in the repo.
- **Client-side search** with `fuse.js`. Don't pull in a heavier search lib.
- **Contact relay** via Formspree or Web3Forms — never expose raw emails in HTML.
- **Vercel Analytics** (privacy-friendly). No Google Analytics.
- **pnpm** as the package manager.

When in doubt about a UI choice, prefer "fewer clicks, less chrome, recruiter can scan in 60 seconds."

## Data model (profile frontmatter)

```yaml
---
slug: jane-smith                         # required, kebab-case, becomes URL
name: Jane Smith                         # required
headline: Senior Mechanical Engineer     # required, one line
location: Dayton, OH                     # required
photo: /photos/jane-smith.jpg            # optional
placed: false                            # required, flips to true when hired
placedAt: null                           # optional, "Acme Corp" once placed
lookingFor: |                            # required, 1-2 sentences in their voice
  Full-time roles in HVAC R&D or product engineering. Open to remote
  or hybrid in the Dayton area.
roles:                                   # required, most recent first
  - title: Senior Mechanical Engineer
    team: R&D
    dates: 2021–2026
skills:                                  # required, 3-8 entries
  - name: SolidWorks
    evidence: /profile/jane-smith#duct-fitting-redesign  # optional internal anchor or external link
  - name: DOE / Six Sigma
projects:                                # required, 2-5 entries
  - title: Duct fitting redesign
    description: Cut leakage by 40% in field tests across 12 installations.
    link: https://example.com/case-study
    year: 2024
kudos:                                   # 2-3 entries
  - author: Sam Rivera
    relationship: Manager, 2022–2026
    text: |
      Jane is the engineer I'd want on any launch. She caught a sealing
      failure two weeks before ship that would have cost us the quarter.
managerNote:                             # optional, but a huge differentiator
  author: Sam Rivera, Director of Engineering
  text: |
    Jane is in the top 5% of engineers I've worked with in 20 years.
    Any team would be lucky to have her.
links:
  linkedin: https://linkedin.com/in/janesmith
  github: null
  portfolio: https://janesmith.dev
  resume: /resumes/jane-smith.pdf        # optional, stored in /public/resumes
contact: relay                            # "relay" routes through Formspree; never publish raw email
---

Optional long-form bio paragraph(s) in MDX go here.
```

**Validation rules** (enforce in `lib/profiles.ts`):
- All required fields present and non-empty.
- `slug` matches the filename.
- `kudos` has 2–3 entries.
- `projects` has 2–5 entries.
- No field contains the strings: salary numbers, "confidential", "internal only", or known Aeroseal internal codenames (maintain a small denylist).

## Repo layout

```
/app
  layout.tsx                  global shell, header, footer
  page.tsx                    landing grid with filters
  profile/[slug]/page.tsx     individual profile
  about/page.tsx              who we are, foreword, sunset date
  submit/page.tsx             link to the opt-in form + CONTRIBUTING
  api/contact/route.ts        Formspree relay handler
/components
  ProfileCard.tsx             grid card
  ProfileFull.tsx             full profile body
  KudosBlock.tsx
  FilterBar.tsx               role / location / lookingFor filters
  PlacedBadge.tsx
  ContactButton.tsx           opens relay modal
/content/profiles/
  _template.mdx               canonical empty template (do not deploy)
  jane-smith.mdx              example (delete before launch)
/lib
  profiles.ts                 loads + validates all MDX at build time
  search.ts                   Fuse.js index builder
/public
  photos/
  resumes/
ROADMAP.md
PRIVACY.md
CONTRIBUTING.md
README.md
CLAUDE.md
```

## Build-time discipline

- Profiles load via `import.meta.glob` or `fs.readdirSync` at build time. **No runtime fetches for profile data.**
- Validation errors should fail the build, not warn. We'd rather catch a malformed profile in CI than ship a broken page.
- Run `pnpm build` before any PR is considered done.

## Privacy non-negotiables

- Never publish a raw email address in HTML. Use the contact relay.
- A profile is removed by deleting its `.mdx` file. Document this in PRIVACY.md and verify the delete-and-redeploy path works before launch.
- `placed: true` is opt-in too. Don't auto-mark someone placed; the maintainer flips the flag only after the person confirms.
- Each profile's frontmatter may set `noindex: true` to add a `<meta name="robots" content="noindex">` tag. Default is to allow indexing — that's the point of the site — but the override must work.

## Style and tone

- Warm, human, professional. Not corporate, not snarky.
- No emoji in the UI. (David's personal preference; also reads as more credible to recruiters.)
- Default to plain English over jargon.
- The home page hero should explicitly say this is alumni-led, opt-in, and complementary to LinkedIn. Set expectations in the first paragraph.

## When you (Claude Code) get stuck

- If a design choice isn't covered here, ask before assuming.
- If a dependency feels heavy for what it does, propose the lightweight alternative.
- Don't add features the user didn't ask for. The site succeeds by being simple.

Next: read `ROADMAP.md` for ordered build steps.
