import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SectionCardProps {
    title: string
    children: React.ReactNode
    className?: string
    icon?: React.ReactNode
}

export default function SectionCard({ title, children, className, icon }: SectionCardProps) {
    return (
        <Card className={cn("overflow-hidden border-border/40 bg-card/50 backdrop-blur-sm", className)}>
            <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                    {icon}
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">{children}</CardContent>
        </Card>
    )
}

