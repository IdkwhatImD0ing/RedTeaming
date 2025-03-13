// app/page.tsx
import { generateUUID } from '@/lib/utils';
import { Chat } from '@/components/chat';

export default function Page() {
    const id = generateUUID();
    const initialMessages = [
        {
            id: generateUUID(),
            role: 'assistant',
            content: 'hello how can I help you today?'
        }
    ];

    return (
        <Chat
            key={id}
            id={id}
            initialMessages={initialMessages}
            isReadonly={false}
        />
    );
}
