'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getMessages } from '@/api/Messages.api';

export function useMessages(roomId: string, enabled = true) {
    return useInfiniteQuery({
        queryKey: ['messages', roomId],
        queryFn: ({ pageParam }) => getMessages(roomId, pageParam as string | null),
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
        enabled,
    });
}
