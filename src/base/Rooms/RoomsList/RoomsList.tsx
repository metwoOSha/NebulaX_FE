'use client';

import { useState } from 'react';
import CreateRoom from '@/components/CreateRoom/CreateRoom';
import CreateRoomModal from '@/components/Modals/CreateRoomModal/CreateRoomModal';
import cls from './RoomsList.module.css';
import CardRoom from '@/components/CardRoom/CardRoom';

export default function RoomsList() {
    const [isCreateOpen, setCreateOpen] = useState(false);

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
                <CreateRoom onClick={() => setCreateOpen(true)} />
            </div>
            <div className={cls.joined}>Joined</div>
            <div className={cls.roomsGrid}>
                <CardRoom />
            </div>
            <div className={cls.recommended}>Recommended for you</div>
            <div className={cls.roomsGrid}>
                <CardRoom />
            </div>

            {isCreateOpen && (
                <CreateRoomModal onClose={() => setCreateOpen(false)} onSubmit={() => setCreateOpen(false)} />
            )}
        </div>
    );
}
