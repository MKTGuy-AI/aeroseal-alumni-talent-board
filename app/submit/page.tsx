import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Add your profile — Aeroseal Alumni Talent Board',
  description:
    'Opt in to the Aeroseal Alumni Talent Board. Fill out a short form and your profile goes live after your approval.',
}

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Add your profile
      </h1>

      <div className="mt-4 space-y-4 text-gray-600">
        <p>
          This board is for former Aeroseal teammates navigating a career
          transition. If you were impacted by the recent layoffs and want to be
          visible to recruiters and hiring managers, filling out the form takes
          about 10 minutes. You&rsquo;ll be asked for a headline, recent roles,
          3&ndash;8 skills with examples, 2&ndash;5 project highlights, and a
          sentence or two about what kind of role you&rsquo;re looking for.
        </p>
        <p>
          The maintainer turns your form response into a profile and sends you a
          preview link before anything goes live. You can opt out at any time
          &mdash; your file is deleted and the site is redeployed, usually
          within a day. No salary data, no internal documents, nothing that
          would make a former colleague uncomfortable.
        </p>
      </div>

      <div className="mt-8">
        <a
          href="https://tally.so/r/PdkA4P"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          Open the opt-in form &rarr;
        </a>
      </div>

      <p className="mt-8 text-sm text-gray-500">
        Prefer to send a PR directly?{' '}
        <a
          href="https://github.com/MKTGuy-AI/aeroseal-alumni-talent-board/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-700"
        >
          See CONTRIBUTING.md
        </a>{' '}
        for the technical path.
      </p>
    </div>
  )
}
