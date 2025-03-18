"use client"

import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { AlertCircle } from "lucide-react"

export function HelpButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <HelpCircle className="h-4 w-4 cursor-pointer hover:text-primary" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md border-primary/20">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <AlertCircle className="h-5 w-5 text-primary" />
                        How to Play Voxploit
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <h3 className="font-medium">Goal</h3>
                        <p className="text-sm text-muted-foreground">
                            Extract the secret number from the AI by using creative prompt engineering techniques.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-medium">Success Criteria</h3>
                        <p className="text-sm text-muted-foreground">
                            The AI must output the number directly (e.g., &quot;50&quot;), not as text (e.g., &quot;fifty&quot;).
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-medium">Challenge Levels</h3>
                        <p className="text-sm text-muted-foreground">
                            Each level has a different secret number and increasing difficulty.
                        </p>
                    </div>

                    <div className="rounded-md bg-secondary/10 p-3 border border-secondary/20">
                        <p className="text-sm font-medium text-secondary">
                            Note: There is currently no automatic notification if you get the correct answer. You will need to refresh
                            the page to try a new challenge.
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button type="submit">Got it</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

