import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';

export async function createClerkSupabaseClientSsr() {
    const { getToken } = await auth();

    // Use a single constant for the token template name.
    const TOKEN_TEMPLATE = 'Voxploit'; // Make sure this matches the name in your Clerk dashboard

    try {
        await getToken({ template: TOKEN_TEMPLATE });
    } catch (error) {
        console.error("Error retrieving Clerk token:", error);
    }

    // Create the Supabase client with a custom fetch override.
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            global: {
                fetch: async (url, options = {}) => {
                    // Use the same token template for consistency.
                    const clerkToken = await getToken({ template: TOKEN_TEMPLATE });
                    const headers = new Headers(options?.headers);
                    headers.set('Authorization', `Bearer ${clerkToken}`);
                    return fetch(url, {
                        ...options,
                        headers,
                    });
                },
            },
        }
    );
}
