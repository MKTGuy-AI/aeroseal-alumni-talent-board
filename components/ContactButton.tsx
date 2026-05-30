'use client'

import { useState, useEffect, useRef } from 'react'

type Props = {
  profileName: string
  profileSlug: string
}

type State = 'idle' | 'sending' | 'success' | 'error'

function getFirstName(profileName: string): string {
  return profileName.replace(/^\[Example\]\s*/, '').split(' ')[0]
}

export default function ContactButton({ profileName, profileSlug }: Props) {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<State>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const nameRef = useRef<HTMLInputElement>(null)
  const firstName = getFirstName(profileName)

  useEffect(() => {
    if (open && nameRef.current) nameRef.current.focus()
  }, [open])

  useEffect(() => {
    if (state !== 'success') return
    const t = setTimeout(() => {
      setOpen(false)
      setState('idle')
    }, 2000)
    return () => clearTimeout(t)
  }, [state])

  function openModal() {
    setState('idle')
    setErrorMsg('')
    setOpen(true)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT
    if (!endpoint) {
      setState('error')
      setErrorMsg('Contact form is not configured yet. Please check back soon.')
      return
    }
    setState('sending')
    const fd = new FormData(e.currentTarget)
    const name = fd.get('name') as string
    const email = fd.get('email') as string
    const message = fd.get('message') as string
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          recipient: profileSlug,
          _subject: `Talent Board: message for ${profileName}`,
          _replyto: email,
        }),
      })
      const json = await res.json()
      if (res.ok) {
        setState('success')
      } else {
        setState('error')
        setErrorMsg(json.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setState('error')
      setErrorMsg('Network error. Please try again.')
    }
  }

  return (
    <>
      <button
        onClick={openModal}
        className="mt-5 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
      >
        Contact {firstName} &rarr;
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-start justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Message {firstName}
              </h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="ml-4 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {state === 'success' ? (
              <div className="py-8 text-center">
                <p className="font-medium text-gray-900">Message sent.</p>
                <p className="mt-1 text-sm text-gray-500">
                  The maintainer will forward it to {firstName} shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Your name
                  </label>
                  <input
                    ref={nameRef}
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Your email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
                  />
                </div>

                {state === 'error' && (
                  <p className="text-sm text-red-600">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
                >
                  {state === 'sending' ? 'Sending…' : 'Send message'}
                </button>

                <p className="text-center text-xs text-gray-400">
                  Your message is forwarded by the maintainer. No email addresses
                  are published on this site.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
