"use client"

import { useState } from "react"
import { Check, Clipboard } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
    code: string
    language: string
    filename?: string
}

export default function CodeBlock({ code, language, filename }: CodeBlockProps) {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="my-6 overflow-hidden rounded-lg border border-border/40 bg-card/50 backdrop-blur-sm">
            {filename && (
                <div className="border-b border-border/40 bg-card/80 px-4 py-2 text-sm font-mono text-card-foreground/70">
                    {filename}
                </div>
            )}
            <div className="relative">
                <pre className="overflow-x-auto p-4 text-sm">
                    <code className={`language-${language}`}>{code}</code>
                </pre>
                <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-2 h-8 w-8 rounded-md bg-background/50 backdrop-blur-sm"
                    onClick={copyToClipboard}
                >
                    {copied ? <Check className="h-4 w-4 text-primary" /> : <Clipboard className="h-4 w-4" />}
                </Button>
            </div>
        </div>
    )
}

