"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle } from "lucide-react"

export function InstructionsDialog() {
    const [open, setOpen] = useState(false)
    const [doNotShowAgain, setDoNotShowAgain] = useState(false)

    useEffect(() => {
        // Check localStorage to see if the user has dismissed the dialog
        const hasSeenInstructions = localStorage.getItem("voxploit-seen-instructions")
        if (!hasSeenInstructions) {
            setOpen(true)
        }
    }, [])

    const handleClose = () => {
        setOpen(false)

        // If "Do not show again" is checked, save to localStorage
        if (doNotShowAgain) {
            localStorage.setItem("voxploit-seen-instructions", "true")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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

                <DialogFooter className="flex items-center justify-between sm:justify-between">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="doNotShowAgain"
                            checked={doNotShowAgain}
                            onCheckedChange={(checked) => setDoNotShowAgain(checked === true)}
                        />
                        <label
                            htmlFor="doNotShowAgain"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Don&apos;t show again
                        </label>
                    </div>

                    <Button onClick={handleClose}>Got it</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

