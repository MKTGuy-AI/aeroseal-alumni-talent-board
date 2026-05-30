'use client'

import { useState } from 'react'

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

export default function Avatar({
  name,
  photo,
  size = 96,
}: {
  name: string
  photo?: string | null
  size?: number
}) {
  const [failed, setFailed] = useState(false)

  const cls = `rounded-full object-cover bg-gray-200 flex-shrink-0`

  if (photo && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photo}
        alt={name}
        width={size}
        height={size}
        onError={() => setFailed(true)}
        className={cls}
        style={{ width: size, height: size }}
      />
    )
  }

  return (
    <div
      className="flex flex-shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-600"
      style={{ width: size, height: size, fontSize: size * 0.33 }}
      aria-label={name}
    >
      {initials(name)}
    </div>
  )
}
