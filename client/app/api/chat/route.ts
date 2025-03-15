import { createDataStreamResponse, smoothStream, streamText } from 'ai';
import { systemPrompt, userPrompt } from '@/lib/ai/text_prompt';
import { openai } from '@ai-sdk/openai';

export async function POST(request: Request) {
    const { messages, level, newMessage } = await request.json();


    return createDataStreamResponse({
        execute: (dataStream: any) => {
            const result = streamText({
                model: openai('gpt-4o-mini'),
                system: systemPrompt(level),
                temperature: 0.7,
                messages: [...messages, { role: 'user', content: userPrompt(level, newMessage) }],
                experimental_transform: smoothStream({ chunking: 'word' }),
                onFinish: async ({ response }) => {
                    // Optionally handle the completed text generation here
                    console.log('Text generation complete');
                },
            });

            result.consumeStream();
            result.mergeIntoDataStream(dataStream, { sendReasoning: false });
        },
        onError: (error) => {
            console.error('Error during text generation:', error);
            return 'Oops, an error occurred!';
        },
    });
}
