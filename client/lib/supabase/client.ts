'use client'
import { useMemo } from 'react'
import { useSession } from '@clerk/nextjs'
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
