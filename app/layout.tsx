import './globals.css'

export const metadata = {
  title: 'Code Explainer',
  description: 'Paste code snippets, get plain explanations',
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
