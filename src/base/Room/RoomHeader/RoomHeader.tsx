'use client';

import IconBadge from '@/components/IconBadge/IconBadge';
import cls from './RoomHeader.module.css';
import OnlineStatus from '@/components/OnlineStatus/OnlineStatus';
import TypingStatus from '@/components/TypingStatus/TypingStatus';
import type { Room } from '@/types/room.types';

interface RoomHeaderProps {
    room?: Room;
    online?: number;
    typingUsernames?: string[];
}

export default function RoomHeader({ room, online = 0, typingUsernames = [] }: RoomHeaderProps) {
    return (
        <div className={cls.RoomHeader}>
            <IconBadge tileId={room?.theme_id ?? 1} size="label" />
            <div>
                <div className={cls.roomName}>
                    <span>{room?.name ?? ''}</span>
                </div>
                {typingUsernames.length > 0 ? (
                    <TypingStatus usernames={typingUsernames} />
                ) : (
                    <OnlineStatus type="room" online={online} />
                )}
            </div>
        </div>
    );
}
