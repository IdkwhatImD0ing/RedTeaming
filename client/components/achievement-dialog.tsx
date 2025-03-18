"use client"

import { useState, useEffect } from "react"
import { Award, CheckCircle, Trophy, X } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AchievementType = "complete" | "new_high_score"

interface AchievementDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    level: string
    type: AchievementType
}

export function AchievementDialog({ open, onOpenChange, level, type }: AchievementDialogProps) {
    const [animateIcon, setAnimateIcon] = useState(false)

    useEffect(() => {
        if (open) {
            setAnimateIcon(true)
            const timer = setTimeout(() => setAnimateIcon(false), 1000)
            return () => clearTimeout(timer)
        }
    }, [open])

    const isHighScore = type === "new_high_score"

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md border-2 border-primary/20 bg-card shadow-lg shadow-primary/10">
                <DialogHeader>
                    <div className="flex justify-between items-center">
                        <DialogTitle className="text-2xl font-bold">
                            {isHighScore ? "New High Score!" : "Level Complete!"}
                        </DialogTitle>
                        <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8 rounded-full">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </div>
                </DialogHeader>

                <div className="flex flex-col items-center py-4">
                    <div
                        className={cn(
                            "flex justify-center items-center h-24 w-24 rounded-full mb-4",
                            "bg-gradient-to-br from-primary/20 to-secondary/20",
                            "border-2 border-primary/30",
                            animateIcon && "animate-pulse",
                        )}
                    >
                        {isHighScore ? (
                            <Trophy className="h-12 w-12 text-secondary" />
                        ) : (
                            <CheckCircle className="h-12 w-12 text-primary" />
                        )}
                    </div>

                    <DialogDescription className="text-center text-lg mb-2">
                        {isHighScore
                            ? `You've achieved a new high score on ${level}!`
                            : `Congratulations! You've completed ${level}!`}
                    </DialogDescription>

                    <p className="text-center text-sm text-muted-foreground mb-4">
                        {isHighScore
                            ? "Your red-teaming skills are improving. Keep pushing the boundaries!"
                            : "You've successfully uncovered the hidden information. Ready for the next challenge?"}
                    </p>

                    <div className="flex gap-2 items-center justify-center">
                        <Award className="h-5 w-5 text-accent" />
                        <span className="text-sm font-medium">
                            {isHighScore ? "Your position on the leaderboard has improved!" : "You've unlocked the next level!"}
                        </span>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button
                        onClick={() => onOpenChange(false)}
                        className="px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                    >
                        {isHighScore ? "Continue Training" : "Next Level"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

