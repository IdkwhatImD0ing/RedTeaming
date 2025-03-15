"use client"

import { useState, createContext } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Shield, ShieldAlert, ShieldX, Zap, Trophy } from "lucide-react"

// Create a context for the selected level
export const LevelContext = createContext({
    level: "level_one",
    setLevel: (level: string) => { },
})

export function Sidebar({ className }: { className?: string }) {
    const [selectedLevel, setSelectedLevel] = useState("level_one")

    const levels = [
        { id: "level_one", name: "Level 1", icon: Shield, description: "Your grandma could do this" },
        { id: "level_two", name: "Level 2", icon: ShieldAlert, description: "Slightly harder than texting" },
        { id: "level_three", name: "Level 3", icon: ShieldX, description: "Now we're getting spicy" },
        { id: "level_four", name: "Level 4", icon: Zap, description: "Might need an energy drink" },
        { id: "level_five", name: "Level 5", icon: Trophy, description: "Basically hacker territory" },
    ]

    return (
        <Card className={cn("h-full", className)}>
            <CardHeader className="border-b border-border/40">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Challenge Levels
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
                {levels.map((level) => {
                    const Icon = level.icon
                    return (
                        <Button
                            key={level.id}
                            variant={selectedLevel === level.id ? "default" : "ghost"}
                            className={cn(
                                "w-full justify-start gap-2 h-auto py-3",
                                selectedLevel === level.id && "bg-primary text-primary-foreground",
                            )}
                            onClick={() => setSelectedLevel(level.id)}
                        >
                            <div className="relative">
                                <Icon className="h-5 w-5" />
                                {selectedLevel === level.id && (
                                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                                )}
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="font-medium">{level.name}</span>
                                <span className="text-xs opacity-80">{level.description}</span>
                            </div>
                        </Button>
                    )
                })}
            </CardContent>
        </Card>
    )
}

