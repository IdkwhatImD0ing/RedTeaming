'use client'
import { Chat } from "@/components/chat/chat"
import { Sidebar } from "@/components/sidebar/sidebar"
import { Highscores } from "@/components/highscores/highscores"
import { LevelProvider } from "@/lib/contexts/LevelContext"
import { ChatProvider } from "@/lib/contexts/ChatContext"

export default function Home() {
    return (
        <LevelProvider>
            <ChatProvider>
                <div className="h-full mx-auto max-w-7xl px-4 md:px-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <Sidebar className="md:col-span-3" />
                    <Chat className="md:col-span-6" />
                    <Highscores className="md:col-span-3" />
                </div>
            </ChatProvider>
        </LevelProvider>
    );
}