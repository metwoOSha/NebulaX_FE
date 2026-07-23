'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { getMe } from '@/api/Auth.api';

export function useMe() {
    const { setUser } = useAuthStore();

    return useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const res = await getMe();
            setUser(res.user);
            return res.user;
        },
        refetchOnWindowFocus: true,
    });
}
