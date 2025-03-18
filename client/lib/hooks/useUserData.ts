import { useEffect, useState } from 'react';
import { useSupabaseClient } from '@/lib/supabase/client';
import { useUser } from '@clerk/nextjs';
import { QueryError } from '@supabase/supabase-js';

interface UserData {
    user_id: string;
    username: string;
    level_one_text: number | null;
    level_two_text: number | null;
    level_three_text: number | null;
    level_four_text: number | null;
    level_five_text: number | null;
    level_one_voice: number | null;
    level_two_voice: number | null;
    level_three_voice: number | null;
    level_four_voice: number | null;
    level_five_voice: number | null;
}

export function useUserData() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const client = useSupabaseClient();
    const { user } = useUser();

    useEffect(() => {
        async function fetchUserData() {
            if (!client || !user) {
                setIsLoading(false);
                return;
            }

            try {
                const { data, error } = await client
                    .from(process.env.NEXT_PUBLIC_TABLE_NAME as string)
                    .select('*')
                    .eq('user_id', user.id) as { data: UserData[] | null, error: QueryError | null };

                if (error) throw error;

                if (data && data.length > 0) {
                    setUserData(data[0]);
                } else {
                    setUserData(null);
                }
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch user data'));
                console.error('Error fetching user data:', err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUserData();
    }, [client, user]);

    const refetch = async () => {
        setIsLoading(true);
        setError(null);

        if (!client || !user) {
            setIsLoading(false);
            return;
        }

        try {
            const { data, error } = await client
                .from(process.env.NEXT_PUBLIC_TABLE_NAME as string)
                .select('*')
                .eq('user_id', user.id) as { data: UserData[] | null, error: QueryError | null };

            if (error) throw error;

            if (data && data.length > 0) {
                setUserData(data[0]);
            } else {
                setUserData(null);
            }
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch user data'));
            console.error('Error fetching user data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return { userData, isLoading, error, refetch };
} 