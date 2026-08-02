'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserById } from '@/api/User.api';

export function useUserById(userId: string) {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUserById(userId),
        staleTime: 5 * 60 * 1000,
    });
}
