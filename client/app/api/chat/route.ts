import { createDataStreamResponse, smoothStream, streamText, DataStreamWriter } from 'ai';
import { systemPrompt, userPrompt } from '@/lib/ai/text_prompt';
import { openai } from '@ai-sdk/openai';
import { currentUser } from '@clerk/nextjs/server';
import { createClerkSupabaseClientSsr } from '@/lib/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';

/**
 * Gets the secret number based on the specified security level
 * @param level The security level string (level_one, level_two, etc.)
 * @returns The secret number for the specified level
 */
function getSecretNumber(level: string): string | undefined {
    switch (level) {
        case 'level_one':
            return process.env.LV_ONE_TEXT_SECRET_NUMBER;
        case 'level_two':
            return process.env.LV_TWO_TEXT_SECRET_NUMBER;
        case 'level_three':
            return process.env.LV_THREE_TEXT_SECRET_NUMBER;
        case 'level_four':
            return process.env.LV_FOUR_TEXT_SECRET_NUMBER;
        case 'level_five':
            return process.env.LV_FIVE_TEXT_SECRET_NUMBER;
        default:
            return process.env.LV_ONE_TEXT_SECRET_NUMBER;
    }
}

interface HighscoreRow {
    [key: string]: string | number | null;
}

export async function POST(request: Request) {
    const { messages, level, newMessage, conversationId } = await request.json();
    console.log(conversationId)


    return createDataStreamResponse({
        execute: (dataStream: DataStreamWriter) => {
            const result = streamText({
                model: openai('gpt-4o-mini'),
                system: systemPrompt(level),
                maxTokens: 1024,
                topP: 1,
                temperature: 1,
                messages: [...messages, { role: 'user', content: userPrompt(level, newMessage) }],
                experimental_transform: smoothStream({ chunking: 'word' }),
                onFinish: async ({ response }) => {
                    const client = await createClerkSupabaseClientSsr()
                    const content = response.messages[response.messages.length - 1].content[0];
                    // Get the response text
                    const responseText = typeof content === 'string' ? content : 'text' in content ? content.text : '';
                    const transcript = [...messages,
                    { role: 'user', content: newMessage },
                    { role: 'assistant', content: responseText }
                    ].map(msg => `${msg.role}: ${msg.content}`).join('\n');
                    const user = await currentUser()
                    const user_id = user?.id
                    const username = user?.username



                    // Optionally handle the completed text generation here
                    const secretNumber = getSecretNumber(level);

                    await client.from('conversations').upsert({
                        user_id: user_id,
                        username: username,
                        id: conversationId,
                        transcript: transcript,
                        level: level,
                    });



                    if (secretNumber) {
                        // Create regex to check if secret number appears surrounded by non-number characters or nothing
                        const regex = new RegExp(`(^|[^0-9])${secretNumber}([^0-9]|$)`, 'g');

                        // Check if the response contains the secret number
                        if (regex.test(responseText)) {

                            // console.log(user_id, username)
                            // console.log(client)


                            // Calculate the current text score as the total number of characters in all user messages.
                            // We only sum characters from messages with role 'user'.
                            const allUserMessages = [...messages, { role: 'user', content: userPrompt(level, newMessage) }];
                            const currentScore = allUserMessages
                                .filter((msg: { role: string; content: string }) => msg.role === 'user')
                                .reduce((acc: number, msg: { content: string }) => acc + msg.content.length, 0);

                            // Build the transcript using the complete conversation, including AI messages.


                            const TABLE_NAME = process.env.NEXT_PUBLIC_TABLE_NAME as string;

                            // Try to select the current row for the user
                            const { data: currentData, error: selectError } = await client
                                .from(TABLE_NAME)
                                .select(`${level}_text`) as { data: HighscoreRow[] | null, error: PostgrestError | null };


                            if (selectError || !currentData || currentData.length === 0) {
                                // No row exists for this user; create a new row
                                const { error: insertError } = await client
                                    .from(TABLE_NAME)
                                    .insert({
                                        user_id: user_id,
                                        username: username,
                                        [`${level}_text`]: currentScore,
                                        [`${level}_text_transcript`]: transcript,
                                    });
                                if (insertError) {
                                    console.error('Error inserting new row:', insertError);
                                } else {
                                    console.log(`New row inserted for user ${user_id} with ${level} high score: ${currentScore}`);
                                }
                            } else {
                                // Row exists; check if we need to update based on the current score
                                const existingScore = currentData[0][`${level}_text`];
                                if (existingScore === null || currentScore < existingScore) {
                                    const { error: updateError } = await client
                                        .from(TABLE_NAME)
                                        .update({
                                            [`${level}_text`]: currentScore,
                                            [`${level}_text_transcript`]: transcript,
                                        })
                                        .eq('user_id', user_id);
                                    if (updateError) {
                                        console.error('Error updating high score:', updateError);
                                    } else {
                                        console.log(`High score updated for ${level} to ${currentScore}`);
                                    }
                                }
                            }
                        }
                    }
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
