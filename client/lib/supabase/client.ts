'use client'
import { useEffect, useMemo } from 'react'
import { useSession, useUser } from '@clerk/nextjs'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

export function useSupabaseClient(): SupabaseClient | null {
    const { session } = useSession()

    const client = useMemo(() => {
        if (!session) return null

        return createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                global: {
                    fetch: async (url, options = {}) => {
                        // Get the Clerk Supabase token using the session object
                        const clerkToken = await session.getToken({ template: 'Voxploit' })
                        const headers = new Headers(options?.headers)
                        headers.set('Authorization', `Bearer ${clerkToken}`)
                        return fetch(url, { ...options, headers })
                    },
                },
            },
        )
    }, [session])

    return client
}

export function useRealtimeUpdates(onUpdate: (data: { level: string; type: 'complete' | 'new_high_score' }) => void) {
    const client = useSupabaseClient()
    const { isLoaded, isSignedIn, user } = useUser()

    useEffect(() => {
        if (!client || !isLoaded || !isSignedIn || !user) return

        const tableName = process.env.NEXT_PUBLIC_TABLE_NAME as string
        const channel = client.channel(tableName)

        // Handle INSERT events: assume this creates the initial row.
        channel.on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: tableName },
            (payload: any) => {
                if (payload.new.user_id !== user.id) return
                // When a row is created, assume Level 1 has been completed.
                onUpdate({ level: 'Level one', type: 'complete' })
            }
        )

        // Handle UPDATE events: check for changes in any of the level score columns.
        channel.on(
            'postgres_changes',
            { event: 'UPDATE', schema: 'public', table: tableName },
            (payload: any) => {
                if (payload.new.user_id !== user.id) return
                console.log('Realtime UPDATE event:', payload)
                const levelColumns = [
                    'level_one_text',
                    'level_two_text',
                    'level_three_text',
                    'level_four_text',
                    'level_five_text'
                ]
                for (let col of levelColumns) {
                    if (payload.old[col] !== payload.new[col]) {
                        const levelCompleted = col.replace('_text', '').replace('level_', 'Level ')
                        // Determine if it's a first-time completion or a new high score:
                        // - If the old value was null, it's a completion.
                        // - Otherwise, it's a new high score.
                        const eventType = payload.old[col] === null ? 'complete' : 'new_high_score'
                        onUpdate({ level: levelCompleted, type: eventType })
                        break // Only trigger one notification per update.
                    }
                }
            }
        )

        channel.subscribe()

        return () => {
            client.removeChannel(channel)
        }
    }, [client, isLoaded, isSignedIn, user, onUpdate])
}