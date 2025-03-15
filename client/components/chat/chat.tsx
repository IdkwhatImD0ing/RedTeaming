"use client"

import type React from "react"

import { useState, useRef, useEffect, useContext } from "react"
import { generateUUID } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { MessageBubble } from "./message-bubble"
import { LevelContext } from "@/components/sidebar/sidebar"
// Mock responses for different levels
const parseStreamOutput = (rawOutput: string): string => {
    const tokenRegex = /(?:\d+):"([^"]+)"/g;
    let result = '';
    let match;
    while ((match = tokenRegex.exec(rawOutput)) !== null) {
        result += match[1];
    }
    return result;
};

export function Chat({
    isReadonly,
    className,
    messages,
    setMessages,
}: {
    isReadonly: boolean
    className?: string
    messages: Array<{ id: string; role: string; content: string }>
    setMessages: React.Dispatch<React.SetStateAction<Array<{ id: string; role: string; content: string }>>>
}) {
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const { level } = useContext(LevelContext)

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Append the user's message
        const userMessage = { id: generateUUID(), role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        // Create an empty assistant message placeholder and keep its ID.
        const assistantMessageId = generateUUID();
        setMessages((prev) => [
            ...prev,
            { id: assistantMessageId, role: 'assistant', content: '' },
        ]);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: messages.concat([userMessage]),
                    level: 'level_one',
                }),
            });

            if (!response.body) throw new Error('No response body');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let done = false;
            let accumulatedRaw = '';

            // Read the stream chunk by chunk
            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunk = decoder.decode(value, { stream: !done });
                accumulatedRaw += chunk;

                // Process the accumulated output to extract text tokens and replace literal "\n" with actual newlines.
                const parsedText = parseStreamOutput(accumulatedRaw).replace(/\\n/g, "\n");

                // Update the assistant's message in the messages state.
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === assistantMessageId ? { ...msg, content: parsedText } : msg
                    )
                );
            }
        } catch (error) {
            console.error('Error during text generation:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className={cn("flex flex-col h-full overflow-hidden", className)}>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}
                <div ref={messagesEndRef} />

                {loading && (
                    <div className="flex justify-center">
                        <div className="animate-pulse flex space-x-1">
                            <div className="h-2 w-2 bg-primary rounded-full"></div>
                            <div className="h-2 w-2 bg-primary rounded-full animation-delay-200"></div>
                            <div className="h-2 w-2 bg-primary rounded-full animation-delay-400"></div>
                        </div>
                    </div>
                )}
            </CardContent>

            {!isReadonly && (
                <CardFooter className="border-t border-border/40 p-4">
                    <form onSubmit={sendMessage} className="flex w-full gap-2">
                        <div className="relative flex-1">
                            <Input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="pr-10"
                                disabled={loading}
                            />
                            {input.length > 0 && (
                                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                    <div className="w-2 h-2 bg-secondary rounded-full animate-ping"></div>
                                </div>
                            )}
                        </div>
                        <Button type="submit" disabled={loading || !input.trim()} className="rounded-full">
                            <Send className="h-4 w-4 mr-2" />
                            Send
                        </Button>
                    </form>
                </CardFooter>
            )}
        </Card>
    )
}

