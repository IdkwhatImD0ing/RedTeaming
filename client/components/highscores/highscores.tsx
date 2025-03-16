'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Trophy, Medal, Award } from "lucide-react";
import { useLevel } from "@/lib/contexts/LevelContext";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@/lib/supabase/client";

interface Highscore {
    user_id: string;
    username: string;
    score: number;
}

export function Highscores({ className }: { className?: string }) {
    const { level } = useLevel();
    const [highscores, setHighscores] = useState<Highscore[]>([]);
    const client = useSupabaseClient();

    // The level can be used to filter or adjust highscores if desired.
    useEffect(() => {
        const fetchHighscores = async () => {
            if (client) {
                // Derive the column name, e.g., "level_one_text"
                const scoreColumn = `${level}_text`;

                // Query the "highscores" table, filtering out rows with null score,
                // ordering by score ascending (lowest first) and limiting to top 10.
                const { data, error } = await client
                    .from('highscores')
                    .select(`user_id, username, ${scoreColumn}`)
                    .not(scoreColumn, 'is', null)
                    .order(scoreColumn, { ascending: true })
                    .limit(10);

                // Map the data to include a renamed 'score' property for easier rendering
                if (!error && data) {
                    const formattedData = data.map((item: any) => ({
                        ...item,
                        id: item.user_id, // Ensure we have an id for the key prop
                        username: item.username,
                        score: item[scoreColumn] // Rename the dynamic column to 'score'
                    }));
                    setHighscores(formattedData);
                    return;
                }

                if (error) {
                    console.error('Error fetching highscores:', error);
                } else {
                    setHighscores(data);
                }
            }
        };
        fetchHighscores();
    }, [level, client]);

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
                            </div>
                            <div className="flex-shrink-0 font-mono font-medium">{score.score.toLocaleString()}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
