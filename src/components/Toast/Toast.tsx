'use client';

import { useEffect } from 'react';
import Portal from '@/utils/Portal';
import cls from './Toast.module.css';

interface ToastProps {
    message: string;
    onDone: () => void;
}

export default function Toast({ message, onDone }: ToastProps) {
    useEffect(() => {
        const timeout = setTimeout(onDone, 2200);
        return () => clearTimeout(timeout);
    }, [onDone]);

    return (
        <Portal>
            <div className={cls.toast}>
                <span>✓</span>
                {message}
            </div>
        </Portal>
    );
}
