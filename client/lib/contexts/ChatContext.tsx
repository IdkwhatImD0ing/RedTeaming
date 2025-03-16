'use client'
import React, { createContext, useContext, useState, useEffect } from "react";
import { generateUUID } from "@/lib/utils";
import { useLevel } from "./LevelContext";

export type Message = { id: string; role: string; content: string };

type ChatContextType = {
    messages: Message[];
    sendMessage: (input: string) => Promise<void>;
    resetMessages: () => void;
};

const ChatContext = createContext<ChatContextType>({
    messages: [],
    sendMessage: async () => { },
    resetMessages: () => { },
});
const initialMessage: Message = {
    id: "1",
    role: "assistant",
    content: "Hello, how can I help you today?",
};

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const { level } = useLevel();
    const [messages, setMessages] = useState<Message[]>([initialMessage]);
    const [conversationId, setConversationId] = useState<string | null>(generateUUID());

    // Reset messages when level changes
    useEffect(() => {
        setMessages([initialMessage]);
    }, [level]);

    const sendMessage = async (input: string) => {
        if (!input.trim()) return;

        // Append the user's message
        const userMessage: Message = { id: generateUUID(), role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);

        // Create an assistant message placeholder
        const assistantMessageId = generateUUID();
        setMessages((prev) => [
            ...prev,
            { id: assistantMessageId, role: "assistant", content: "" },
        ]);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages],
                    newMessage: input,
                    level: level,
                    conversationId: conversationId,
                }),
            });

            if (!response.body) throw new Error("No response body");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let done = false;
            let accumulatedRaw = "";

            // Process the stream response chunk by chunk
            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunk = decoder.decode(value, { stream: !done });
                accumulatedRaw += chunk;
                const parsedText = parseStreamOutput(accumulatedRaw).replace(/\\n/g, "\n");

                // Update the assistant message with the new content
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === assistantMessageId ? { ...msg, content: parsedText } : msg
                    )
                );
            }
        } catch (error) {
            console.error("Error during text generation:", error);
        }
    };

    const resetMessages = () => {
        setMessages([initialMessage]);
        setConversationId(generateUUID());
    };

    // Helper function for processing streamed output
    const parseStreamOutput = (rawOutput: string): string => {
        // Use a more robust regex that handles escaped quotes
        const tokenRegex = /(?:\d+):"((?:\\"|[^"])+)"/g;
        let result = '';
        let match;
        while ((match = tokenRegex.exec(rawOutput)) !== null) {
            // Replace escaped quotes with actual quotes
            result += match[1].replace(/\\"/g, '"');
        }
        return result;
    };

    return (
        <ChatContext.Provider value={{ messages, sendMessage, resetMessages }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    return useContext(ChatContext);
}
