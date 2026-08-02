'use client';

import Link from 'next/link';
import clsx from 'clsx';

import IconBadge from '@/components/IconBadge/IconBadge';
import type { Room } from '@/types/room.types';
import cls from './RoomListItem.module.css';

interface RoomListItemProps {
    room: Room;
    isActive?: boolean;
    unreadCount?: number;
    isCollapsed?: boolean;
}

export default function RoomListItem({ room, isActive, unreadCount, isCollapsed }: RoomListItemProps) {
    return (
        <Link
            href={`/room/${room.id}`}
            className={clsx(cls.roomItem, isActive && cls.roomItemActive, isCollapsed && cls.roomItemCollapsed)}
            title={isCollapsed ? room.name : undefined}
        >
            <IconBadge tileId={room.theme_id} size={isCollapsed ? 'collapsed' : 'label'} />
            {!isCollapsed && <span className={cls.name}>{room.name}</span>}
            {!isCollapsed && !!unreadCount && <span className={cls.badge}>{unreadCount}</span>}
        </Link>
    );
}
