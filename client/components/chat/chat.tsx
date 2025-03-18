'use client'
import { useState, useRef, useEffect, FormEvent } from "react";
import { useChat } from "@/lib/contexts/ChatContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Send, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { MessageBubble } from "./messageBubble";

export function Chat({ className }: { className?: string }) {
    const { messages, sendMessage, resetMessages } = useChat();
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

    const handleReset = () => {
        resetMessages();
    };

    return (
        <Card className={cn("flex flex-col h-full overflow-hidden", className)}>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 ">
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
                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="pr-24 min-h-[80px] resize-none"
                            disabled={loading}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    if (input.trim()) {
                                        handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
                                    }
                                }
                            }}
                        />
                        <div className="absolute bottom-2 right-2 flex gap-2">
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={handleReset}
                                className="h-8 px-2"
                            >
                                <RefreshCw className="h-4 w-4" />
                            </Button>
                            <Button
                                type="submit"
                                size="sm"
                                disabled={loading || !input.trim()}
                                className="h-8 px-3"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </form>
            </CardFooter>
        </Card>
    );
}
