'use client';

import { useQuery } from '@tanstack/react-query';
import { getTags } from '@/api/Tags.api';
import { Tag } from '@/types/tag.types';

export function useTags() {
    return useQuery({
        queryKey: ['tags'],
        queryFn: async (): Promise<Tag[]> => {
            const res = await getTags();
            return res.tags;
        },
    });
}
