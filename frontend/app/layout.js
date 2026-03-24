import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Knowledge Engine',
  description: 'Your personal AI-powered document assistant',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">
              AI Knowledge Engine
            </h1>
            <span className="text-sm text-gray-500">
              Powered by Mistral + ChromaDB
            </span>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}