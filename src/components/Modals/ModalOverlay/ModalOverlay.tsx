'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';
import Portal from '@/utils/Portal';
import cls from './ModalOverlay.module.css';

interface ModalOverlayProps {
    children: ReactNode;
    width?: number;
    dimmed?: boolean;
    padding?: string;
}

export default function ModalOverlay({ children, width = 380, dimmed = true, padding }: ModalOverlayProps) {
    return (
        <Portal>
            <div className={clsx(cls.overlay, dimmed && cls.dimmed)}>
                <div className={cls.card} style={{ width, ...(padding && { padding }) }}>
                    {children}
                </div>
            </div>
        </Portal>
    );
}
