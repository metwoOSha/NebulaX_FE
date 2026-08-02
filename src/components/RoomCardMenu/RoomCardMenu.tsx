'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Portal from '@/utils/Portal';
import type { Room } from '@/types/room.types';
import cls from './RoomCardMenu.module.css';

interface RoomCardMenuProps {
    room: Room;
    x: number;
    y: number;
    isAdmin: boolean;
    onClose: () => void;
    onCopyLink: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onLeave: () => void;
}

export default function RoomCardMenu({
    room,
    x,
    y,
    isAdmin,
    onClose,
    onCopyLink,
    onEdit,
    onDelete,
    onLeave,
}: RoomCardMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: y, left: x });

    useLayoutEffect(() => {
        const el = menuRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const margin = 8;
        const left = Math.min(x, window.innerWidth - rect.width - margin);
        const top = Math.min(y, window.innerHeight - rect.height - margin);
        setPosition({ left: Math.max(margin, left), top: Math.max(margin, top) });
    }, [x, y]);

    useLayoutEffect(() => {
        const handlePointerDown = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose();
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('mousedown', handlePointerDown, true);
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('scroll', onClose, true);
        window.addEventListener('resize', onClose);
        return () => {
            document.removeEventListener('mousedown', handlePointerDown, true);
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('scroll', onClose, true);
            window.removeEventListener('resize', onClose);
        };
    }, [onClose]);

    return (
        <Portal>
            <div ref={menuRef} className={cls.menu} style={{ top: position.top, left: position.left }}>
                <div className={cls.label}>{room.name}</div>

                <button type="button" className={cls.item} onClick={onCopyLink}>
                    <span className={cls.icon}>🔗</span>Copy link
                </button>

                {isAdmin && (
                    <>
                        <div className={cls.divider} />
                        <button type="button" className={cls.item} onClick={onEdit}>
                            <span className={cls.icon}>✎</span>Edit room
                        </button>
                        <div className={cls.divider} />
                        <button type="button" className={`${cls.item} ${cls.danger}`} onClick={onDelete}>
                            <span className={cls.icon}>🗑</span>Delete room
                        </button>
                    </>
                )}

                {!isAdmin && (
                    <>
                        <div className={cls.divider} />
                        <button type="button" className={`${cls.item} ${cls.danger}`} onClick={onLeave}>
                            <span className={cls.icon}>⎋</span>Leave room
                        </button>
                    </>
                )}
            </div>
        </Portal>
    );
}
