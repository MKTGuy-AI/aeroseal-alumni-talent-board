import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProfiles, getProfile } from '@/lib/profiles'
import Avatar from '@/components/Avatar'

export function generateStaticParams() {
  return getProfiles().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const profile = getProfile(slug)
  if (!profile) return {}
  return {
    title: `${profile.name} — Aeroseal Alumni Talent Board`,
    description: profile.headline,
    robots: profile.noindex ? 'noindex' : undefined,
  }
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const profile = getProfile(slug)
  if (!profile) notFound()

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Header */}
      <div className="flex items-start gap-6">
        <Avatar name={profile.name} photo={profile.photo} size={96} />
        <div className="min-w-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {profile.name}
          </h1>
          <p className="mt-1 text-lg text-gray-600">{profile.headline}</p>
          <p className="mt-1 text-sm text-gray-500">{profile.location}</p>
          {profile.placed && (
            <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
              Placed{profile.placedAt ? ` at ${profile.placedAt}` : ''}
            </span>
          )}
        </div>
      </div>

      {/* Looking for */}
      <section className="mt-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Looking for
        </h2>
        <p className="mt-2 text-gray-700 leading-relaxed">{profile.lookingFor}</p>
      </section>

      {/* Bio */}
      {profile.body && (
        <section className="mt-8">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {profile.body}
          </p>
        </section>
      )}

      {/* Roles */}
      <section className="mt-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Experience
        </h2>
        <ul className="mt-3 space-y-3">
          {profile.roles.map((role, i) => (
            <li key={i} className="flex items-baseline justify-between gap-4">
              <div>
                <span className="font-medium text-gray-900">{role.title}</span>
                {role.team && (
                  <span className="ml-2 text-sm text-gray-500">· {role.team}</span>
                )}
              </div>
              <span className="flex-shrink-0 text-sm text-gray-400">{role.dates}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section className="mt-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Skills
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {profile.skills.map((skill, i) =>
            skill.evidence ? (
              <a
                key={i}
                href={skill.evidence}
                className="rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:border-gray-500 hover:text-gray-900 transition-colors"
              >
                {skill.name}
              </a>
            ) : (
              <span
                key={i}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-700"
              >
                {skill.name}
              </span>
            ),
          )}
        </div>
      </section>

      {/* Projects */}
      <section className="mt-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Projects
        </h2>
        <ul className="mt-3 space-y-5">
          {profile.projects.map((proj, i) => (
            <li key={i} id={proj.title.toLowerCase().replace(/\s+/g, '-')}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-semibold text-gray-900">
                  {proj.link ? (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {proj.title}
                    </a>
                  ) : (
                    proj.title
                  )}
                </h3>
                <span className="flex-shrink-0 text-sm text-gray-400">{proj.year}</span>
              </div>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                {proj.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Kudos */}
      <section className="mt-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Kudos
        </h2>
        <ul className="mt-3 space-y-4">
          {profile.kudos.map((kudo, i) => (
            <li key={i} className="rounded-lg border border-gray-200 bg-gray-50 p-5">
              <blockquote className="text-gray-700 leading-relaxed">
                &ldquo;{kudo.text.trim()}&rdquo;
              </blockquote>
              <p className="mt-3 text-sm font-medium text-gray-900">{kudo.author}</p>
              <p className="text-xs text-gray-500">{kudo.relationship}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Manager note */}
      {profile.managerNote && (
        <section className="mt-6">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
              Manager&rsquo;s note
            </p>
            <blockquote className="text-gray-700 leading-relaxed">
              &ldquo;{profile.managerNote.text.trim()}&rdquo;
            </blockquote>
            <p className="mt-3 text-sm font-medium text-gray-900">
              {profile.managerNote.author}
            </p>
          </div>
        </section>
      )}

      {/* Links */}
      <section className="mt-10 flex flex-wrap gap-4">
        {profile.links.linkedin && (
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-700 hover:underline"
          >
            LinkedIn
          </a>
        )}
        {profile.links.github && (
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-700 hover:underline"
          >
            GitHub
          </a>
        )}
        {profile.links.portfolio && (
          <a
            href={profile.links.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-700 hover:underline"
          >
            Portfolio
          </a>
        )}
        {profile.links.resume && (
          <a
            href={profile.links.resume}
            className="text-sm font-medium text-blue-700 hover:underline"
          >
            Resume (PDF)
          </a>
        )}
      </section>
    </div>
  )
}
