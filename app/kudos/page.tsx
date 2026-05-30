import type { Metadata } from 'next'
import { getProfiles } from '@/lib/profiles'
import Avatar from '@/components/Avatar'

export const metadata: Metadata = {
  title: 'Write a kudo — Aeroseal Alumni Talent Board',
  robots: 'noindex',
}

export default function KudosPage() {
  const profiles = getProfiles()

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Vouch for an Aeroseal alum
      </h1>

      <div className="mt-4 space-y-4 text-gray-600">
        <p>
          Peer kudos carry more weight than LinkedIn endorsements because
          they&rsquo;re specific. A two-sentence note that names a moment, what
          happened, and why it mattered is worth more than a dozen generic
          skill-clicks. Former Aeroseal teammates navigating a career transition
          benefit most from the kind of direct, honest vouching that only a
          colleague can give.
        </p>
        <p>
          Every kudo submitted here is reviewed by the maintainer. The person
          you&rsquo;re vouching for approves it before it goes live &mdash; so
          if something needs to be tweaked or clarified, we&rsquo;ll be in touch
          before it&rsquo;s published.
        </p>
      </div>

      <ul className="mt-10 divide-y divide-gray-100">
        {profiles.map((profile) => {
          const firstName = profile.name.split(' ')[0]
          return (
            <li
              key={profile.slug}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Avatar name={profile.name} photo={profile.photo} size={40} />
                <div className="min-w-0">
                  <p className="font-medium text-gray-900">{profile.name}</p>
                  <p className="truncate text-sm text-gray-500">
                    {profile.headline}
                  </p>
                </div>
              </div>
              <a
                href={`https://tally.so/r/44z2gO?recipient=${profile.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-500 hover:text-gray-900"
              >
                Write a kudo for {firstName} &rarr;
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
