'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Shield, ShieldAlert, ShieldX, Zap, Trophy } from "lucide-react";
import { useLevel } from "@/lib/contexts/LevelContext";
import { useRealtimeUpdates } from "@/lib/supabase/client";
import { useEffect, useState, useCallback } from "react";
import { HelpButton } from "../help-button";
import { AchievementDialog } from "../achievement-dialog";
import { useUserData } from "@/lib/hooks/useUserData";

const levels = [
    { id: "level_one", name: "Level 1", icon: Shield, description: "Your grandma could do this" },
    { id: "level_two", name: "Level 2", icon: ShieldAlert, description: "Slightly harder than texting" },
    { id: "level_three", name: "Level 3", icon: ShieldX, description: "Now we're getting spicy" },
    { id: "level_four", name: "Level 4", icon: Zap, description: "Might need an energy drink" },
    { id: "level_five", name: "Level 5", icon: Trophy, description: "Basically hacker territory" },
];

export function Sidebar({ className }: { className?: string }) {
    const { level, setLevel } = useLevel();
    const { userData, refetch } = useUserData();
    const [achievementDialogOpen, setAchievementDialogOpen] = useState(false);
    const [achievementType, setAchievementType] = useState<"complete" | "new_high_score">("complete");
    const [achievementLevel, setAchievementLevel] = useState<string>("");

    useEffect(() => {
        setLevel(localStorage.getItem('currentLevel') || "level_one");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        localStorage.setItem('currentLevel', level);
    }, [level]);

    const handleRealtimeUpdate = useCallback((data: { level: string; type: 'complete' | 'new_high_score' }) => {
        setAchievementDialogOpen(true);
        setAchievementType(data.type);
        setAchievementLevel(data.level);
    }, [])

    useRealtimeUpdates(handleRealtimeUpdate);

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
            <AchievementDialog
                open={achievementDialogOpen}
                onOpenChange={(open) => {
                    setAchievementDialogOpen(open);
                    refetch();
                }}
                level={achievementLevel}
                type={achievementType}
            />
            <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-lg flex items-center">
                    <Shield className="h-5 w-5 text-primary mr-2" />
                    <span className="flex-1">Challenge Levels</span>
                    <HelpButton />
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
