import './globals.css'

export const metadata = {
  title: 'Code Explainer',
  description: 'Paste code snippets, get plain explanations',
  icons: {
    icon: '/code-explainer favicon.png',
    shortcut: '/code-explainer favicon.png',
    apple: '/code-explainer favicon.png',
  },
  openGraph: {
    title: 'Code Explainer',
    description: 'Paste code snippets, get plain explanations',
    images: ['/code-explainer favicon.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
