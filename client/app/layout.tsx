import { type Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { createMetadata } from './metadata'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = createMetadata({
  title: "Voxploit - Red-Team Voice Security Training",
  description:
    "Sharpen your red-teaming and prompt-engineering skills through dynamic chatbot and voicebot challenges. Engage with advanced conversational AIs across multiple scenarios.",
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} font-sans antialiased h-full min-h-screen bg-background text-foreground flex flex-col`}
        >
          <Header />
          <main className="flex-1 py-4 h-full overflow-auto">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
