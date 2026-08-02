'use client';

import { useMe } from '@/hooks/useMe';
import { useSocket } from '@/hooks/useSocket';

export function AuthInitializer() {
    useMe();
    useSocket();
    return null;
}
