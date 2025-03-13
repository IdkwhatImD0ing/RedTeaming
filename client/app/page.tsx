import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MicIcon, ShieldAlert, Lock, Zap } from "lucide-react"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <MicIcon className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Voxploit</span>
          </div>
          <nav className="flex items-center gap-4">
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Master AI Security Through Voice Interaction
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Sharpen your red-teaming skills with our interactive, voice-enabled AI security platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/sign-up">
                    <Button className="px-8">
                      Start Training
                      <Zap className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="outline" className="px-8">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-4/5 w-4/5 rounded-full bg-accent/10 p-4">
                      <div className="absolute inset-0 animate-pulse rounded-full bg-accent/5"></div>
                      <div className="absolute inset-4 animate-pulse rounded-full bg-accent/10 animation-delay-500"></div>
                      <div className="absolute inset-8 animate-pulse rounded-full bg-accent/15 animation-delay-1000"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <MicIcon className="h-16 w-16 text-primary animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose Voxploit?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Our platform offers unique advantages for security professionals and AI enthusiasts.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <ShieldAlert className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Advanced Scenarios</h3>
                <p className="text-center text-muted-foreground">
                  Practice with realistic red-teaming scenarios designed by security experts.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <MicIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Voice Interaction</h3>
                <p className="text-center text-muted-foreground">
                  Engage with AI using natural voice commands for a more immersive experience.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <Lock className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Real-time Feedback</h3>
                <p className="text-center text-muted-foreground">
                  Get instant analysis of your techniques and strategies to improve faster.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Test Your Skills?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Join our community of security professionals and AI enthusiasts today.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/sign-up">
                  <Button size="lg" className="px-8">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Voxploit. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

