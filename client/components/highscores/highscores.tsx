"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Trophy, Medal, Award } from "lucide-react"
import { useContext } from "react"
import { LevelContext } from "@/components/sidebar/sidebar"

export function Highscores({ className }: { className?: string }) {
    const { level } = useContext(LevelContext)
    // Mock data for highscores
    const highscores = [
        { id: 1, username: "RedTeam_Master", score: 9850, date: "2023-05-15" },
        { id: 2, username: "PromptHacker", score: 9200, date: "2023-05-14" },
        { id: 3, username: "AIWhisperer", score: 8750, date: "2023-05-13" },
        { id: 4, username: "SecOpsElite", score: 8500, date: "2023-05-12" },
        { id: 5, username: "VoiceBreaker", score: 8100, date: "2023-05-11" },
        { id: 6, username: "CyberSleuth", score: 7800, date: "2023-05-10" },
        { id: 7, username: "NeuralNinja", score: 7600, date: "2023-05-09" },
        { id: 8, username: "QuantumHacker", score: 7400, date: "2023-05-08" },
    ]



    return (
        <Card className={cn("h-full", className)}>
            <CardHeader className="border-b border-border/40">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-secondary" />
                    Leaderboard
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y divide-border/40">
                    {highscores.map((score, index) => (
                        <div key={score.id} className={cn("flex items-center gap-3 p-4", index < 3 && "bg-card/50")}>
                            <div className="flex-shrink-0 w-8 text-center">
                                {index === 0 && <Trophy className="h-5 w-5 text-secondary mx-auto" />}
                                {index === 1 && <Medal className="h-5 w-5 text-accent mx-auto" />}
                                {index === 2 && <Award className="h-5 w-5 text-primary mx-auto" />}
                                {index > 2 && <span className="text-sm font-medium">{index + 1}</span>}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{score.username}</p>
                                <p className="text-xs opacity-80">{score.date}</p>
                            </div>
                            <div className="flex-shrink-0 font-mono font-medium">{score.score.toLocaleString()}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
