import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Shield, Target } from "lucide-react"
import AnimatedBackground from "@/components/animated-background"

export default function HomePage() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <AnimatedBackground />

            <div className="container relative z-10 mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center text-center">
                    <h1 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl md:text-7xl">
                        Prompt Engineering
                    </h1>
                    <p className="mt-6 max-w-3xl text-xl text-foreground/80">
                        Master the art of crafting prompts for Large Language Models through defensive and offensive strategies.
                    </p>

                    <div className="mt-12 grid w-full max-w-5xl gap-8 md:grid-cols-2">
                        <StrategyCard
                            title="Blue Team Strategies"
                            description="Learn defensive prompt engineering techniques to secure LLMs against jailbreaks and exploits."
                            icon={<Shield className="h-12 w-12 text-primary" />}
                            href="/details/blue-team"
                            color="primary"
                        />

                        <StrategyCard
                            title="Red Team Strategies"
                            description="Explore offensive prompt engineering techniques used to uncover vulnerabilities in LLM systems."
                            icon={<Target className="h-12 w-12 text-secondary" />}
                            href="/details/red-team"
                            color="secondary"
                        />
                    </div>

                    <div className="mt-16">
                        <h2 className="text-3xl font-bold">Why Learn Both Approaches?</h2>
                        <p className="mt-4 max-w-3xl text-lg text-foreground/80">
                            Understanding both defensive and offensive prompt engineering creates a comprehensive security mindset.
                            Blue team strategies help build robust systems, while red team techniques reveal potential weaknesses.
                        </p>
                    </div>

                    <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href="/details/blue-team">
                            <Button size="lg" className="group">
                                Start with Defense
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                        <Link href="/details/red-team">
                            <Button size="lg" variant="outline" className="group">
                                Explore Offense
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StrategyCard({
    title,
    description,
    icon,
    href,
    color,
}: {
    title: string
    description: string
    icon: React.ReactNode
    href: string
    color: "primary" | "secondary" | "accent"
}) {
    const colorClasses = {
        primary: "from-primary/20 to-primary/5 hover:from-primary/30 hover:to-primary/10 border-primary/20",
        secondary: "from-secondary/20 to-secondary/5 hover:from-secondary/30 hover:to-secondary/10 border-secondary/20",
        accent: "from-accent/20 to-accent/5 hover:from-accent/30 hover:to-accent/10 border-accent/20",
    }

    return (
        <Link href={href} className="group">
            <Card
                className={`h-full overflow-hidden border bg-gradient-to-b p-6 transition-all duration-300 ${colorClasses[color]}`}
            >
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 rounded-full bg-background/50 p-3 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                        {icon}
                    </div>
                    <h3 className="text-2xl font-bold">{title}</h3>
                    <p className="mt-2 text-foreground/80">{description}</p>
                    <div className="mt-4 flex items-center text-foreground/60 transition-colors group-hover:text-foreground">
                        <span>Learn more</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </Card>
        </Link>
    )
}

