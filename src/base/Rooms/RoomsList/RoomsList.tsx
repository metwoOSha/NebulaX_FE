'use client';

import CreateRoom from '@/components/CreateRoom/CreateRoom';
import cls from './RoomsList.module.css';
import CardRoom from '@/components/CardRoom/CardRoom';

export default function RoomsList() {
    return (
        <div className={cls.rooms}>
            <div className={cls.roomsHeader}>
                <div className={cls.roomsTitle}>Rooms</div>
                <div className={cls.roomsSubTitle}>
                    <span>5 rooms · your squad is waiting</span>
                </div>
            </div>
            <div className={cls.created}>Created by you</div>
            <div className={cls.roomsGrid}>
                <CardRoom />
                <CreateRoom />
            </div>
            <div className={cls.joined}>Joined</div>
            <div className={cls.roomsGrid}>
                <CardRoom />
            </div>
            <div className={cls.recommended}>Recommended for you</div>
            <div className={cls.roomsGrid}>
                <CardRoom />
            </div>
        </div>
    );
}
