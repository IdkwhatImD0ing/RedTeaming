'use client'
import { Chat } from "@/components/chat/chat"
import { Sidebar } from "@/components/sidebar/sidebar"
import { Highscores } from "@/components/highscores/highscores"
import { LevelProvider } from "@/lib/contexts/LevelContext"
import { ChatProvider } from "@/lib/contexts/ChatContext"
import { InstructionsDialog } from "@/components/instruction-dialog";


export default function Home() {
    return (
        <div className="h-full w-full flex-1 mx-auto max-w-7xl px-4 md:px-6 grid grid-cols-1 md:grid-cols-12 gap-6 flex-grow">
            <LevelProvider>
                <ChatProvider>
                    <InstructionsDialog />
                    <Sidebar className="md:col-span-3" />
                    <Chat className="md:col-span-6" />
                    <Highscores className="md:col-span-3" />
                </ChatProvider>
            </LevelProvider>
        </div>

    );
}