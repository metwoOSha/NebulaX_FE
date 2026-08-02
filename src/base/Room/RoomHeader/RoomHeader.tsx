'use client';

import IconBadge from '@/components/IconBadge/IconBadge';
import cls from './RoomHeader.module.css';
import OnlineStatus from '@/components/OnlineStatus/OnlineStatus';
import TypingStatus from '@/components/TypingStatus/TypingStatus';

interface RoomHeaderProps {
    online?: number;
    typingUsernames?: string[];
}

export default function RoomHeader({ online = 3, typingUsernames = [] }: RoomHeaderProps) {
    return (
        <div className={cls.RoomHeader}>
            <IconBadge tileId={1} size="label" />
            <div>
                <div className={cls.roomName}>
                    <span>Late Night Co-op</span>
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
