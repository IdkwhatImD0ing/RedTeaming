import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="mx-auto max-w-6xl flex flex-col items-center gap-4 md:h-24 md:flex-row md:justify-between">
        <p className="text-center text-sm leading-loose text-muted-foreground">
          © {new Date().getFullYear()} Voxploit. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/terms"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
}
