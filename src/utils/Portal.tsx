'use client';

import { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

const noopSubscribe = () => () => {};

export default function Portal({ children }: { children: React.ReactNode }) {
    const mounted = useSyncExternalStore(
        noopSubscribe,
        () => true,
        () => false
    );

    if (!mounted) return null;

    return createPortal(children, document.body);
}
