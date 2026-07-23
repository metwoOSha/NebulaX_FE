'use client';

import { useMe } from '@/hooks/useMe';

export function AuthInitializer() {
    useMe();
    return null;
}
