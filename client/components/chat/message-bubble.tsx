"use client"

import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks"
import { cn } from "@/lib/utils"
import { AlertCircle } from "lucide-react"

export function MessageBubble({
    message,
}: {
    message: { id: string; role: string; content: string }
}) {
    const isUser = message.role === "user"

    return (
        <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
            <div
                className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3",
                    isUser ? "bg-primary text-primary-foreground" : "bg-card border border-border/40",
                )}
            >
                {message.role === "assistant" && message.content.includes("error") && (
                    <div className="flex items-center gap-2 text-destructive mb-2">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">System Alert</span>
                    </div>
                )}
                <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkBreaks]}>{message.content}</ReactMarkdown>
                </div>
            </div>
        </div>
    )
}

