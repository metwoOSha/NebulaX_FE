'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateRoom from '@/components/CreateRoom/CreateRoom';
import CreateRoomModal, { CreateRoomFormValues } from '@/components/Modals/CreateRoomModal/CreateRoomModal';
import { useRooms } from '@/hooks/useRooms';
import cls from './RoomsList.module.css';
import CardRoom from '@/components/CardRoom/CardRoom';

export default function RoomsList() {
    const [isCreateOpen, setCreateOpen] = useState(false);
    const router = useRouter();
    const { data, isLoading, createRoomMutation } = useRooms();

    const onCreateRoom = async ({ name, description, tileId }: CreateRoomFormValues) => {
        await createRoomMutation.mutateAsync({ name, description, theme_id: tileId });
        setCreateOpen(false);
    };

    const my = data?.my ?? [];
    const joined = data?.joined ?? [];
    const recommended = data?.recommended ?? [];
    const total = my.length + joined.length + recommended.length;

    return (
        <div className={cls.rooms}>
            <div className={cls.roomsHeader}>
                <div className={cls.roomsTitle}>Rooms</div>
                <div className={cls.roomsSubTitle}>
                    <span>{isLoading ? 'Loading rooms…' : `${total} rooms · your squad is waiting`}</span>
                </div>
            </div>

            <div className={cls.created}>Created by you</div>
            <div className={cls.roomsGrid}>
                {my.map((room) => (
                    <CardRoom
                        key={room.id}
                        room={room}
                        badgeType="admin"
                        onClick={() => router.push(`/room/${room.id}`)}
                    />
                ))}
                <CreateRoom onClick={() => setCreateOpen(true)} />
            </div>

            <div className={cls.joined}>Joined</div>
            {joined.length > 0 ? (
                <div className={cls.roomsGrid}>
                    {joined.map((room) => (
                        <CardRoom
                            key={room.id}
                            room={room}
                            badgeType="member"
                            onClick={() => router.push(`/room/${room.id}`)}
                        />
                    ))}
                </div>
            ) : (
                !isLoading && <span className={cls.empty}>You haven&apos;t joined any rooms yet</span>
            )}

            <div className={cls.recommended}>Recommended for you</div>
            {recommended.length > 0 ? (
                <div className={cls.roomsGrid}>
                    {recommended.map((room) => (
                        <CardRoom
                            key={room.id}
                            room={room}
                            badgeType="join"
                            onClick={() => router.push(`/room/${room.id}`)}
                        />
                    ))}
                </div>
            ) : (
                !isLoading && <span className={cls.empty}>No recommendations yet</span>
            )}

            {isCreateOpen && <CreateRoomModal onClose={() => setCreateOpen(false)} onSubmit={onCreateRoom} />}
        </div>
    );
}
