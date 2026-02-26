import type { Metadata } from 'next'
import { spaceGrotesk, dmSans } from '@/lib/fonts'
import { SITE_THEME } from '@/config/site'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sail High Software Solutions — Enterprise AI & Mobility Systems for Thailand',
  description:
    'Thailand-based technology company delivering enterprise systems, smart education platforms, and professional IT staffing services. Government-ready and enterprise-grade.',
  keywords: ['enterprise software', 'AI solutions', 'Thailand technology', 'ERP', 'smart education', 'IT staffing'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme={SITE_THEME} className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  )
}
