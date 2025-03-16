'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MicIcon } from "lucide-react"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export default function Header() {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 md:px-6 flex h-16 items-center justify-between py-4">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <MicIcon className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Voxploit</span>
          </div>
        </Link>
        <nav className="flex items-center gap-4">
          <SignedOut>
            {/* <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link> */}
            <Link href="/sign-up">
              <Button variant="default">Get Started</Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </div>
    </header>
  )
}
