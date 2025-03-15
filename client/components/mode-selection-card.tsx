"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"

interface ModeSelectionCardProps {
    title: string
    description: string
    icon: React.ReactNode
    href: string
    accentColor: "primary" | "secondary" | "accent"
}

export function ModeSelectionCard({ title, description, icon, href, accentColor = "primary" }: ModeSelectionCardProps) {
    const [isHovering, setIsHovering] = useState(false)

    const accentColorMap = {
        primary: "border-primary/20 hover:border-primary/80 group-hover:text-primary",
        secondary: "border-secondary/20 hover:border-secondary/80 group-hover:text-secondary",
        accent: "border-accent/20 hover:border-accent/80 group-hover:text-accent",
    }

    const glowColorMap = {
        primary: "group-hover:shadow-[0_0_15px_rgba(215,38,49,0.3)]",
        secondary: "group-hover:shadow-[0_0_15px_rgba(255,127,17,0.3)]",
        accent: "group-hover:shadow-[0_0_15px_rgba(15,125,194,0.3)]",
    }

    return (
        <Link
            href={href}
            className="group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <Card
                className={cn(
                    "transition-all duration-300 ease-in-out border-2",
                    accentColorMap[accentColor],
                    glowColorMap[accentColor],
                    "h-full hover:translate-y-[-4px]",
                )}
            >
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                    <div
                        className={cn(
                            "p-4 rounded-full mb-4 transition-colors duration-300",
                            isHovering ? `text-${accentColor}` : "text-foreground",
                        )}
                    >
                        {icon}
                    </div>

                    <h2 className="text-xl font-bold mb-2">{title}</h2>

                    <p className="text-foreground/70">{description}</p>

                    <div
                        className={cn(
                            "mt-6 text-sm font-medium transition-colors duration-300",
                            isHovering ? `text-${accentColor}` : "text-foreground/60",
                        )}
                    >
                        Select {title.split(" ")[0]} →
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

