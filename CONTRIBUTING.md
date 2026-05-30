# Contributing — adding or updating your profile

There are two ways to get on the board. Both are opt-in.

## The easy way (recommended)

Fill out the opt-in form: **https://tally.so/r/PdkA4P**

You'll be asked for:
- Name, headline, location, optional photo
- Recent roles at Aeroseal (titles and rough dates, no internal team codenames)
- 3–8 skills, with a link or project that demonstrates each one where possible
- 2–5 project highlights — what shipped, what changed because of it, optional link
- 2–3 peer kudos — short notes from teammates (you can request these yourself; we recommend a quick text or DM with a 2-sentence prompt)
- A 1–2 sentence "what I'm looking for"
- Links to LinkedIn, GitHub, portfolio, optional resume
- An optional manager note from a previous manager (this one's powerful — ask)

The maintainer will turn your form response into a profile and open a PR. You'll get a preview link to approve before it goes live.

## The technical way

If you're comfortable with GitHub:

1. Fork the repo.
2. Copy `content/profiles/_template.mdx` to `content/profiles/your-name.mdx`.
3. Fill in the frontmatter. Optional long-form bio goes in the MDX body below the frontmatter.
4. Add a photo to `public/photos/` if you want one. Same filename as the slug (e.g. `your-name.jpg`).
5. Open a PR.

The build will fail if any required field is missing — that's intentional.

## What we won't publish

- Salary information or compensation history
- Internal Aeroseal documents, codenames, or unreleased product details
- Negative comments about Aeroseal, former managers, or coworkers
- Anything you'd be uncomfortable showing your most respected former colleague

If a kudo or manager note crosses any of those lines, we'll ask you to revise it.

## Getting kudos from teammates

Most people freeze when asked "give me a recommendation." Make it easy. Send a former coworker a message like:

> Hey — I'm putting together a profile on the Aeroseal alumni board. Would you write 2-3 sentences about us working together? Something like a specific moment, what I did, and how it landed. No pressure on length or polish.

Two or three of these per profile dramatically outperforms LinkedIn endorsements.

## Updating or removing your profile

- **Update:** open a PR against your own MDX file, or message the maintainer.
- **Mark yourself placed:** great! Message the maintainer with the new company name (or just "placed"). We don't auto-mark anyone — you tell us when.
- **Remove yourself:** message the maintainer. Your file is deleted and the site is redeployed, usually within a day.

## Maintainer

David Koerner — [contact link to be added]
