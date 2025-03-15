'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import { generateUUID } from '@/lib/utils';

export function Chat({
    initialMessages,
    isReadonly,
}: {
    initialMessages: Array<{ id: string; role: string; content: string }>;
    isReadonly: boolean;
}) {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    // This helper mimics the example stream parser:
    // It extracts tokens matching the pattern: number:"text"
    const parseStreamOutput = (rawOutput: string): string => {
        const tokenRegex = /(?:\d+):"([^"]+)"/g;
        let result = '';
        let match;
        while ((match = tokenRegex.exec(rawOutput)) !== null) {
            result += match[1];
        }
        return result;
    };

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
        <div className="p-4 max-w-xl mx-auto">
            <div className="mb-4 border p-2 rounded space-y-2">
                {messages.map((msg) => (
                    <div key={msg.id}>
                        <strong>{msg.role}: </strong>
                        <div className="prose">
                            <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                                {msg.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                ))}
            </div>
            {!isReadonly && (
                <form onSubmit={sendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 p-2 border rounded"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="p-2 bg-blue-500 text-white rounded"
                    >
                        {loading ? 'Generating...' : 'Send'}
                    </button>
                </form>
            )}
        </div>
    );
}
