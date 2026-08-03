'use client';

import CardBadge from '../CardBadge/CardBadge';
import IconBadge from '../IconBadge/IconBadge';
import OnlineStatus from '../OnlineStatus/OnlineStatus';
import type { Room } from '@/types/room.types';
import cls from './CardRoom.module.css';

interface CardRoomProps {
    room: Room;
    badgeType: 'admin' | 'member' | 'join';
    onClick?: () => void;
    onContextMenu?: (e: React.MouseEvent) => void;
}

export default function CardRoom({ room, badgeType, onClick, onContextMenu }: CardRoomProps) {
    return (
        <div className={cls.roomCard} onClick={onClick} onContextMenu={onContextMenu}>
            {onContextMenu && (
                <button
                    type="button"
                    className={cls.menuButton}
                    aria-label="Room options"
                    onClick={(e) => {
                        e.stopPropagation();
                        onContextMenu(e);
                    }}
                >
                    ⋮
                </button>
            )}
            <div className={cls.roomBody}>
                <div className={cls.roomIcon}>
                    <IconBadge tileId={room.theme_id} size="md" />
                </div>
                <div className={cls.roomName}>
                    <span>{room.name}</span>
                </div>
                <div className={cls.roomMeta}>
                    <OnlineStatus online={room.online_count ?? 0} type="card" />
                    <CardBadge type={badgeType} />
                </div>
            </div>
            <div className={cls.roomCardReveal}>
                Open room&#32;
                <span className={cls.arrow}>→</span>
            </div>
        </div>
    );
}
