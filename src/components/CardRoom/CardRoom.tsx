'use client';

import CardBadge from '../CardBadge/CardBadge';
import OnlineStatus from '../OnlineStatus/OnlineStatus';
import cls from './CardRoom.module.css';

export default function CardRoom() {
    return (
        <div className={cls.roomCard}>
            <div className={cls.roomBody}>
                <div className={cls.roomIcon}>
                    <div style={{ height: '40px', width: '40px', borderRadius: '12px', backgroundColor: 'blue' }}></div>
                    <span className={cls.roomBadge}>3</span>
                </div>
                <div className={cls.roomName}>
                    <span>Squad Lobby</span>
                </div>
                <div className={cls.roomMeta}>
                    <OnlineStatus online={6} />
                    <CardBadge type="admin" />
                </div>
            </div>
            <div className={cls.roomCardReveal}>
                Open room&#32;
                <span className={cls.arrow}>→</span>
            </div>
        </div>
    );
}
