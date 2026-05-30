import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Strings that must never appear in any profile field
const BANNED_STRINGS = ['confidential', 'internal only']

// Salary patterns: $80,000 / $80k / 80k salary / etc.
const SALARY_RE =
  /\$\s*\d[\d,]+|\b\d[\d,]*\s*k\b.{0,20}(salary|comp|compensation|pay|package)/i

const PROFILES_DIR = path.join(process.cwd(), 'content', 'profiles')

// ---------- Types ----------

export type Role = {
  title: string
  team: string
  dates: string
}

export type Skill = {
  name: string
  evidence?: string | null
}

export type Project = {
  title: string
  description: string
  link?: string | null
  year: number
}

export type Kudo = {
  author: string
  relationship: string
  text: string
}

export type ManagerNote = {
  author: string
  text: string
}

export type Links = {
  linkedin?: string | null
  github?: string | null
  portfolio?: string | null
  resume?: string | null
}

export type Profile = {
  slug: string
  name: string
  headline: string
  location: string
  photo?: string | null
  placed: boolean
  placedAt?: string | null
  lookingFor: string
  roles: Role[]
  skills: Skill[]
  projects: Project[]
  kudos: Kudo[]
  managerNote?: ManagerNote | null
  links: Links
  contact: string
  noindex?: boolean
  body: string
}

// ---------- Validation helpers ----------

function fail(slug: string, msg: string): never {
  throw new Error(`[profiles] "${slug}": ${msg}`)
}

function requireField(slug: string, field: string, value: unknown): void {
  if (value === undefined || value === null || value === '') {
    fail(slug, `required field "${field}" is missing or empty`)
  }
}

function scanString(slug: string, fieldPath: string, value: string): void {
  const lower = value.toLowerCase()
  for (const banned of BANNED_STRINGS) {
    if (lower.includes(banned)) {
      fail(slug, `field "${fieldPath}" contains forbidden string "${banned}"`)
    }
  }
  if (SALARY_RE.test(value)) {
    fail(slug, `field "${fieldPath}" appears to contain salary data`)
  }
}

function scanDeep(slug: string, fieldPath: string, value: unknown): void {
  if (typeof value === 'string') {
    scanString(slug, fieldPath, value)
  } else if (Array.isArray(value)) {
    value.forEach((item, i) => scanDeep(slug, `${fieldPath}[${i}]`, item))
  } else if (value !== null && typeof value === 'object') {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      scanDeep(slug, `${fieldPath}.${k}`, v)
    }
  }
}

// ---------- Core validator ----------

function validate(
  filename: string,
  data: Record<string, unknown>,
  body: string,
): Profile {
  const slug = filename.replace(/\.mdx?$/, '')

  requireField(slug, 'slug', data.slug)
  requireField(slug, 'name', data.name)
  requireField(slug, 'headline', data.headline)
  requireField(slug, 'location', data.location)
  requireField(slug, 'lookingFor', data.lookingFor)

  if (data.slug !== slug) {
    fail(
      slug,
      `frontmatter slug "${data.slug}" does not match filename "${filename}"`,
    )
  }

  if (typeof data.placed !== 'boolean') {
    fail(slug, '"placed" must be a boolean (true or false)')
  }

  if (!Array.isArray(data.roles) || data.roles.length === 0) {
    fail(slug, '"roles" must be a non-empty array')
  }

  if (
    !Array.isArray(data.skills) ||
    data.skills.length < 3 ||
    data.skills.length > 8
  ) {
    fail(slug, '"skills" must have 3–8 entries')
  }

  if (
    !Array.isArray(data.projects) ||
    data.projects.length < 2 ||
    data.projects.length > 5
  ) {
    fail(slug, '"projects" must have 2–5 entries')
  }

  if (
    !Array.isArray(data.kudos) ||
    data.kudos.length < 2 ||
    data.kudos.length > 3
  ) {
    fail(slug, '"kudos" must have 2–3 entries')
  }

  // Denylist scan across all fields and body
  scanDeep(slug, 'frontmatter', data)
  if (body) scanString(slug, 'body', body)

  return {
    slug: data.slug as string,
    name: data.name as string,
    headline: data.headline as string,
    location: data.location as string,
    photo: (data.photo as string | null | undefined) ?? null,
    placed: data.placed as boolean,
    placedAt: (data.placedAt as string | null | undefined) ?? null,
    lookingFor: (data.lookingFor as string).trim(),
    roles: data.roles as Role[],
    skills: data.skills as Skill[],
    projects: data.projects as Project[],
    kudos: data.kudos as Kudo[],
    managerNote: (data.managerNote as ManagerNote | null | undefined) ?? null,
    links: (data.links as Links) ?? {},
    contact: (data.contact as string) ?? 'relay',
    noindex: (data.noindex as boolean | undefined) ?? false,
    body: body.trim(),
  }
}

// ---------- Loader ----------

let _cache: Profile[] | null = null

export function getProfiles(): Profile[] {
  if (_cache) return _cache

  const files = fs
    .readdirSync(PROFILES_DIR)
    .filter(
      (f) =>
        (f.endsWith('.mdx') || f.endsWith('.md')) && !f.startsWith('_'),
    )

  _cache = files.map((file) => {
    const source = fs.readFileSync(path.join(PROFILES_DIR, file), 'utf8')
    const { data, content } = matter(source)
    return validate(file, data as Record<string, unknown>, content)
  })

  return _cache
}

export function getProfile(slug: string): Profile | undefined {
  return getProfiles().find((p) => p.slug === slug)
}
