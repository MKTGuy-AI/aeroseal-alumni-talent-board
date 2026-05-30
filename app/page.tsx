import { Suspense } from 'react'
import Link from 'next/link'
import { getProfiles } from '@/lib/profiles'
import type { Profile } from '@/lib/profiles'
import FilterBar from '@/components/FilterBar'
import ProfileCard from '@/components/ProfileCard'

function filterProfiles(
  profiles: Profile[],
  q: string,
  location: string,
  placed: string,
): Profile[] {
  let result = profiles

  if (q) {
    const lq = q.toLowerCase()
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(lq) ||
        p.headline.toLowerCase().includes(lq) ||
        p.skills.some((s) => s.name.toLowerCase().includes(lq)) ||
        p.projects.some(
          (pr) =>
            pr.title.toLowerCase().includes(lq) ||
            pr.description.toLowerCase().includes(lq),
        ),
    )
  }

  if (location) {
    result = result.filter((p) => p.location === location)
  }

  if (placed === 'looking') result = result.filter((p) => !p.placed)
  else if (placed === 'placed') result = result.filter((p) => p.placed)

  return result
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; location?: string; placed?: string }>
}) {
  const sp = await searchParams
  const allProfiles = getProfiles()
  const locations = [...new Set(allProfiles.map((p) => p.location))].sort()

  const profiles = filterProfiles(
    allProfiles,
    sp.q ?? '',
    sp.location ?? '',
    sp.placed ?? 'all',
  )

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Aeroseal Alumni Talent Board
        </h1>
        <p className="mt-3 text-xl text-gray-600">
          Former Aeroseal teammates looking for their next role.
        </p>
        <div className="mt-6">
          <Link
            href="/submit"
            className="inline-block rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
          >
            Get listed &rarr;
          </Link>
        </div>
        <div className="mt-8 max-w-2xl space-y-3">
          <p className="text-gray-600">
            This is an alumni-led, opt-in talent board &mdash; not an official
            Aeroseal property. Each profile pairs the things LinkedIn
            doesn&rsquo;t capture well: peer kudos, project highlights with
            proof, and a personal note about what each person is looking for.
            It&rsquo;s here to complement LinkedIn, not replace it.
          </p>
          <p className="text-gray-600">
            Recruiters: use the filters below to narrow by location or status,
            scan the cards for skills that fit your role, and click into any
            profile for the full picture. Each profile has a contact button that
            routes through a relay &mdash; no personal email addresses are
            exposed in the HTML.
          </p>
        </div>
      </div>

      {/* Filters */}
      <Suspense>
        <FilterBar locations={locations} />
      </Suspense>

      {/* Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profiles.length > 0 ? (
          profiles.map((p) => <ProfileCard key={p.slug} profile={p} />)
        ) : (
          <p className="col-span-full py-16 text-center text-gray-400">
            No profiles match these filters.
          </p>
        )}
      </div>
    </div>
  )
}
