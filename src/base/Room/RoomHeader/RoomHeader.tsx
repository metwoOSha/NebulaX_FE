'use client';

import IconBadge from '@/components/IconBadge/IconBadge';
import cls from './RoomHeader.module.css';
import OnlineStatus from '@/components/OnlineStatus/OnlineStatus';

export default function RoomHeader() {
    return (
        <div className={cls.RoomHeader}>
            <IconBadge tileId={1} size="label" />
            <div>
                <div className={cls.roomName}>
                    <span>Late Night Co-op</span>
                </div>
                <OnlineStatus type="room" online={3} />
            </div>
        </div>
    );
}
