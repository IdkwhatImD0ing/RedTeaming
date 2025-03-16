'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Shield, ShieldAlert, ShieldX, Zap, Trophy } from "lucide-react";
import { useLevel } from "@/lib/contexts/LevelContext";
import { useSupabaseClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

interface UserData {
    user_id: string;
    username: string;
    level_one_text: number | null;
    level_two_text: number | null;
    level_three_text: number | null;
    level_four_text: number | null;
    level_five_text: number | null;
    level_one_voice: number | null;
    level_two_voice: number | null;
    level_three_voice: number | null;
    level_four_voice: number | null;
    level_five_voice: number | null;
}

interface SupabaseError {
    message: string;
    details: string;
    hint: string;
    code: string;
}

const levels = [
    { id: "level_one", name: "Level 1", icon: Shield, description: "Your grandma could do this" },
    { id: "level_two", name: "Level 2", icon: ShieldAlert, description: "Slightly harder than texting" },
    { id: "level_three", name: "Level 3", icon: ShieldX, description: "Now we're getting spicy" },
    { id: "level_four", name: "Level 4", icon: Zap, description: "Might need an energy drink" },
    { id: "level_five", name: "Level 5", icon: Trophy, description: "Basically hacker territory" },
];

export function Sidebar({ className }: { className?: string }) {
    const { level, setLevel } = useLevel();
    const { user } = useUser();
    const [userData, setUserData] = useState<UserData | null>(null);
    const client = useSupabaseClient();

    useEffect(() => {
        const fetchUserData = async () => {
            if (client && user) {
                const { data, error } = await client
                    .from(process.env.NEXT_PUBLIC_TABLE_NAME as string)
                    .select('*')
                    .eq('user_id', user.id) as { data: UserData[] | null, error: SupabaseError | null };

                if (!error && data && data.length > 0) {
                    setUserData(data[0]);

                    // Set the level to the highest unlocked level
                    const highestLevel = getHighestUnlockedLevel(data[0]);
                    setLevel(highestLevel);
                } else if (error) {
                    console.error('Error fetching user data:', error);
                    setUserData(null);
                }
            }
        };
        fetchUserData();
    }, [user, client, setLevel]);

    // Get the highest level the user has unlocked
    const getHighestUnlockedLevel = (userData: UserData): string => {
        if (userData.level_four_text !== null) return "level_five";
        if (userData.level_three_text !== null) return "level_four";
        if (userData.level_two_text !== null) return "level_three";
        if (userData.level_one_text !== null) return "level_two";
        return "level_one";
    };

    // Check if a level is unlocked by verifying if the previous level was passed
    const isLevelUnlocked = (lvlId: string) => {
        if (!userData) {
            // Before user data loads, only Level 1 is available
            return lvlId === "level_one";
        }
        switch (lvlId) {
            case "level_one":
                return true;
            case "level_two":
                return userData.level_one_text !== null;
            case "level_three":
                return userData.level_two_text !== null;
            case "level_four":
                return userData.level_three_text !== null;
            case "level_five":
                return userData.level_four_text !== null;
            default:
                return false;
        }
    };

    return (
        <Card className={cn("h-full", className)}>
            <CardHeader className="border-b border-border/40">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Challenge Levels
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
                {levels.map((lvl) => {
                    const Icon = lvl.icon;
                    const unlocked = isLevelUnlocked(lvl.id);
                    return (
                        <Button
                            key={lvl.id}
                            disabled={!unlocked}
                            variant={level === lvl.id ? "default" : "ghost"}
                            className={cn(
                                "w-full justify-start gap-2 h-auto py-3",
                                level === lvl.id && "bg-primary text-primary-foreground",
                                !unlocked && "opacity-50 cursor-not-allowed"
                            )}
                            onClick={() => {
                                if (unlocked) {
                                    setLevel(lvl.id);
                                }
                            }}
                        >
                            <div className="relative">
                                <Icon className="h-5 w-5" />
                                {level === lvl.id && (
                                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                                )}
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="font-medium">{lvl.name}</span>
                                <span className="text-xs opacity-80">{lvl.description}</span>
                            </div>
                        </Button>
                    );
                })}
            </CardContent>
        </Card>
    );
}
