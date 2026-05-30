import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aeroseal Alumni Talent Board',
  description:
    'An alumni-led, opt-in talent board for Aeroseal employees impacted by layoffs. Complementary to LinkedIn — not a replacement.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <header className="border-b border-gray-200 px-6 py-4">
          <span className="text-lg font-semibold tracking-tight">
            Aeroseal Alumni Talent Board
          </span>
        </header>
        <main>{children}</main>
        <footer className="border-t border-gray-200 px-6 py-6 text-sm text-gray-500">
          <p>
            Alumni-led. Not an official Aeroseal property. Maintained by David
            Koerner.
          </p>
        </footer>
      </body>
    </html>
  )
}
