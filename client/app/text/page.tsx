'use client'
import { Chat } from "@/components/chat/chat"
import { Sidebar } from "@/components/sidebar/sidebar"
import { Highscores } from "@/components/highscores/highscores"
import { useEffect, useContext, useState } from "react"
import { LevelContext } from "@/components/sidebar/sidebar"


const initialMessages = [
    {
        id: "1",
        role: "assistant",
        content:
            "Hello, how can I help you today?",
    },
]

export default function Home() {
    const { level } = useContext(LevelContext)
    const [messages, setMessages] = useState<Array<{ id: string; role: string; content: string }>>([])


    useEffect(() => {
        setMessages(initialMessages)
    }, [level])

    return (
        <div className="h-full mx-auto max-w-7xl px-4 md:px-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            <Sidebar className="md:col-span-3" />
            <Chat isReadonly={false} className="md:col-span-6" messages={messages} setMessages={setMessages} />
            <Highscores className="md:col-span-3" />
        </div>

    )
}

