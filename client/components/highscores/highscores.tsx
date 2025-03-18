'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Trophy, Medal, Award } from "lucide-react";
import { useLevel } from "@/lib/contexts/LevelContext";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@/lib/supabase/client";

interface HighscoreRow {
    user_id: string;
    username: string;
    [key: string]: string | number;
}

interface Highscore {
    user_id: string;
    username: string;
    score: number;
}

interface SupabaseError {
    message: string;
    details: string;
    hint: string;
    code: string;
}

export function Highscores({ className }: { className?: string }) {
    const { level } = useLevel();
    const [highscores, setHighscores] = useState<Highscore[]>([]);
    const client = useSupabaseClient();

    useEffect(() => {
        const fetchHighscores = async () => {
            if (client) {
                const scoreColumn = `${level}_text`;

                const { data, error } = await client
                    .from(process.env.NEXT_PUBLIC_TABLE_NAME as string)
                    .select(`user_id, username, ${scoreColumn}`)
                    .not(scoreColumn, 'is', null)
                    .order(scoreColumn, { ascending: true })
                    .limit(10) as { data: HighscoreRow[] | null, error: SupabaseError | null };

                if (!error && data) {
                    const formattedData = data.map((item: HighscoreRow) => ({
                        user_id: item.user_id,
                        username: item.username,
                        score: Number(item[scoreColumn])
                    }));
                    setHighscores(formattedData);
                } else if (error) {
                    console.error('Error fetching highscores:', error);
                    setHighscores([]);
                }
            }
        };
        fetchHighscores();
    }, [level, client]);

    return (
        <Card className={cn("h-full", className)}>
            <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-secondary" />
                    Leaderboard
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y divide-border/40">
                    {highscores.map((score, index) => (
                        <div key={index} className={cn("flex items-center gap-3 p-4", index < 3 && "bg-card/50")}>
                            <div className="flex-shrink-0 w-8 text-center">
                                {index === 0 && <Trophy className="h-5 w-5 text-secondary mx-auto" />}
                                {index === 1 && <Medal className="h-5 w-5 text-accent mx-auto" />}
                                {index === 2 && <Award className="h-5 w-5 text-primary mx-auto" />}
                                {index > 2 && <span className="text-sm font-medium">{index + 1}</span>}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{score.username}</p>
                            </div>
                            <div className="flex-shrink-0 font-mono font-medium">{score.score.toLocaleString()}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
