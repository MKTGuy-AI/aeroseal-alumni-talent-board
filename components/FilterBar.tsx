'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type PlacedFilter = 'all' | 'looking' | 'placed'

const TOGGLE_LABELS: Record<PlacedFilter, string> = {
  all: 'All',
  looking: 'Looking',
  placed: 'Placed',
}

export default function FilterBar({ locations }: { locations: string[] }) {
  const router = useRouter()
  const sp = useSearchParams()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [search, setSearch] = useState(sp.get('q') ?? '')

  useEffect(() => {
    setSearch(sp.get('q') ?? '')
  }, [sp])

  function buildUrl(overrides: Record<string, string | null>) {
    const params = new URLSearchParams(sp.toString())
    for (const [k, v] of Object.entries(overrides)) {
      if (!v) params.delete(k)
      else params.set(k, v)
    }
    const qs = params.toString()
    return qs ? `/?${qs}` : '/'
  }

  function handleSearch(val: string) {
    setSearch(val)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      router.replace(buildUrl({ q: val || null }))
    }, 300)
  }

  const location = sp.get('location') ?? ''
  const placed = (sp.get('placed') ?? 'all') as PlacedFilter

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <input
        type="search"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search name, skills, projects…"
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-gray-500 focus:outline-none sm:w-72"
      />

      <select
        value={location}
        onChange={(e) =>
          router.replace(buildUrl({ location: e.target.value || null }))
        }
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
      >
        <option value="">All locations</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      <div className="flex overflow-hidden rounded-lg border border-gray-300 text-sm">
        {(['all', 'looking', 'placed'] as PlacedFilter[]).map((opt) => (
          <button
            key={opt}
            onClick={() =>
              router.replace(buildUrl({ placed: opt === 'all' ? null : opt }))
            }
            className={`px-3 py-2 transition-colors ${
              placed === opt
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {TOGGLE_LABELS[opt]}
          </button>
        ))}
      </div>
    </div>
  )
}
