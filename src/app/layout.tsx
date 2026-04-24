import type { Metadata } from 'next'
import { AppProviders } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Leleka — профіль',
  description: 'Профіль користувача',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
