'use client'
import { useState, useRef, useEffect, FormEvent } from "react";
import { useChat } from "@/lib/contexts/ChatContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { MessageBubble } from "./messageBubble";

export function Chat({ className }: { className?: string }) {
    const { messages, sendMessage } = useChat();
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;
        setLoading(true);
        await sendMessage(input);
        setInput("");
        setLoading(false);
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
            <CardFooter className="border-t border-border/40 p-4">
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                    <div className="relative flex-1">
                        <Input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="pr-10"
                            disabled={loading}
                        />
                    </div>
                    <Button type="submit" disabled={loading || !input.trim()} className="rounded-full">
                        <Send className="h-4 w-4 mr-2" />
                        Send
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}
