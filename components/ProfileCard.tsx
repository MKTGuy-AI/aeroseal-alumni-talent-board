import Link from 'next/link'
import Avatar from './Avatar'
import type { Profile } from '@/lib/profiles'

function truncate(str: string, max: number): string {
  const s = str.trim()
  return s.length <= max ? s : s.slice(0, max).trimEnd() + '…'
}

export default function ProfileCard({ profile }: { profile: Profile }) {
  const topSkills = profile.skills.slice(0, 3)
  const firstKudo = profile.kudos[0]
  const kudoSnippet = firstKudo
    ? `“${truncate(firstKudo.text, 120)}” — ${firstKudo.author}`
    : null

  return (
    <Link
      href={`/profile/${profile.slug}`}
      className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-gray-400 hover:shadow-sm"
    >
      <div className="flex items-start gap-4">
        <Avatar name={profile.name} photo={profile.photo} size={48} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h2 className="font-semibold leading-snug text-gray-900">{profile.name}</h2>
            {profile.placed && (
              <span className="flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                {profile.placedAt ? `Placed at ${profile.placedAt}` : 'Placed'}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-gray-600">{profile.headline}</p>
          <p className="mt-0.5 text-xs text-gray-400">{profile.location}</p>
        </div>
      </div>

      {topSkills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {topSkills.map((skill, i) => (
            <span
              key={i}
              className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs text-gray-700"
            >
              {skill.name}
            </span>
          ))}
        </div>
      )}

      {kudoSnippet && (
        <p className="mt-4 text-xs italic leading-relaxed text-gray-500">
          {kudoSnippet}
        </p>
      )}
    </Link>
  )
}
