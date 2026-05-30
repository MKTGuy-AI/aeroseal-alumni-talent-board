import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — Aeroseal Alumni Talent Board',
  description:
    'What this directory is, how it works, and the commitments we make to every person listed.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        About this directory
      </h1>

      <div className="mt-6 space-y-5 text-gray-600 leading-relaxed">
        <p>
          This is an alumni-led talent board created to support Aeroseal teammates
          impacted by recent layoffs. LinkedIn does a fine job of tracking where
          people have been; it does a worse job of capturing the texture of someone
          &rsquo;s actual work &mdash; the specific problems they solved, the projects
          that shipped, and what former colleagues say when asked directly. This
          directory tries to fill that gap. Each profile features peer kudos,
          project highlights with concrete outcomes, and a personal note about
          what the person is looking for. The goal is to make it easy for a
          recruiter or hiring manager to spend 60 seconds and find someone worth
          a real conversation.
        </p>

        <p>
          This is not an official Aeroseal property and it has no affiliation with
          Aeroseal, LLC. It carries no salary data, no internal documents, and
          nothing submitted without explicit opt-in from the person listed. Every
          profile is opt-in, every person controls their own page, and removal is
          honored promptly.
        </p>

        <p>
          Operating commitments: the maintainer reviews every submission before it
          goes live, and profile owners receive a preview link for approval before
          anything is published. Removal requests are honored within 24 hours. The
          site is intended to operate for one year from public launch (Launch date:
          TBD), after which we&rsquo;ll archive the repo and either take it down or
          leave a static summary page, depending on what makes sense for the people
          still listed.
        </p>
      </div>

      <div className="mt-10">
        <p className="text-sm text-gray-500">
          Built by{' '}
          <a
            href="https://linkedin.com/in/davidkoerner"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-700"
          >
            David Koerner
          </a>
          .
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
          How to help
        </h2>
        <ul className="mt-4 space-y-3 text-gray-600">
          <li>
            <Link
              href="/kudos"
              className="font-medium text-gray-900 underline hover:text-gray-600"
            >
              Write a kudo for someone
            </Link>{' '}
            &mdash; two or three specific sentences from a former colleague carry
            more weight than a dozen LinkedIn endorsements.
          </li>
          <li>
            <Link
              href="/submit"
              className="font-medium text-gray-900 underline hover:text-gray-600"
            >
              Submit your own profile
            </Link>{' '}
            &mdash; if you were impacted and want to be visible to recruiters, the
            opt-in form takes about 10 minutes.
          </li>
          <li>
            Forward the site URL to a recruiter or HR leader in your network who
            hires in engineering, operations, or marketing &mdash; that&rsquo;s the
            most direct way to get these profiles in front of the right people.
          </li>
        </ul>
      </div>

      <div className="mt-10">
        <a
          href="https://github.com/MKTGuy-AI/aeroseal-alumni-talent-board"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-400 underline hover:text-gray-600"
        >
          View source on GitHub
        </a>
      </div>
    </div>
  )
}
