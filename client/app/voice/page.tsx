'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Construction } from "lucide-react"

export default function VoicePage() {
    return (
        <div className="h-full mx-auto max-w-7xl px-4 md:px-6 flex items-center justify-center">
            <Card className="w-full max-w-lg">
                <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                        <Construction className="h-6 w-6 text-amber-500" />
                        Under Construction
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">
                        The voice challenge is currently being developed and will be available soon.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Please check back later for updates.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
