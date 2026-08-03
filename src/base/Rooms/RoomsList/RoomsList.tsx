'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateRoom from '@/components/CreateRoom/CreateRoom';
import CreateRoomModal, { CreateRoomFormValues } from '@/components/Modals/CreateRoomModal/CreateRoomModal';
import JoinRoomModal from '@/components/Modals/JoinRoomModal/JoinRoomModal';
import ConfirmModal from '@/components/Modals/ConfirmModal/ConfirmModal';
import RoomCardMenu from '@/components/RoomCardMenu/RoomCardMenu';
import Toast from '@/components/Toast/Toast';
import { getRoomById } from '@/api/Rooms.api';
import { useRooms } from '@/hooks/useRooms';
import type { Room } from '@/types/room.types';
import cls from './RoomsList.module.css';
import CardRoom from '@/components/CardRoom/CardRoom';

interface MenuState {
    room: Room;
    x: number;
    y: number;
    isAdmin: boolean;
}

export default function RoomsList() {
    const [isCreateOpen, setCreateOpen] = useState(false);
    const [joinTarget, setJoinTarget] = useState<Room | null>(null);
    const [menu, setMenu] = useState<MenuState | null>(null);
    const [toast, setToast] = useState<string | null>(null);
    const [editTarget, setEditTarget] = useState<Room | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Room | null>(null);
    const [leaveTarget, setLeaveTarget] = useState<Room | null>(null);
    const router = useRouter();
    const {
        data,
        isLoading,
        createRoomMutation,
        joinRoomMutation,
        updateRoomMutation,
        deleteRoomMutation,
        leaveRoomMutation,
    } = useRooms();

    const onCreateRoom = async ({ name, description, tileId, tags }: CreateRoomFormValues) => {
        await createRoomMutation.mutateAsync({ name, description, theme_id: tileId, tags });
        setCreateOpen(false);
    };

    const onEditRoom = async ({ name, description, tileId, tags }: CreateRoomFormValues) => {
        if (!editTarget) return;
        await updateRoomMutation.mutateAsync({
            id: editTarget.id,
            body: { name, description, theme_id: tileId, tags },
        });
        setEditTarget(null);
    };

    const openMenu = (e: React.MouseEvent, room: Room, isAdmin: boolean) => {
        e.preventDefault();
        setMenu((current) => (current?.room.id === room.id ? null : { room, x: e.clientX, y: e.clientY, isAdmin }));
    };

    const handleCopyLink = async (room: Room) => {
        await navigator.clipboard.writeText(`${window.location.origin}/room/${room.id}`);
        setMenu(null);
        setToast('Link copied');
    };

    const handleEditClick = async (room: Room) => {
        setMenu(null);
        const { room: fullRoom } = await getRoomById(room.id);
        setEditTarget(fullRoom);
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
                        onContextMenu={(e) => openMenu(e, room, true)}
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
                            onContextMenu={(e) => openMenu(e, room, false)}
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
                        <CardRoom key={room.id} room={room} badgeType="join" onClick={() => setJoinTarget(room)} />
                    ))}
                </div>
            ) : (
                !isLoading && <span className={cls.empty}>No recommendations yet</span>
            )}

            {isCreateOpen && <CreateRoomModal onClose={() => setCreateOpen(false)} onSubmit={onCreateRoom} />}

            {joinTarget && (
                <JoinRoomModal
                    room={joinTarget}
                    onClose={() => setJoinTarget(null)}
                    onConfirm={() => joinRoomMutation.mutateAsync(joinTarget.id)}
                />
            )}

            {menu && (
                <RoomCardMenu
                    room={menu.room}
                    x={menu.x}
                    y={menu.y}
                    isAdmin={menu.isAdmin}
                    onClose={() => setMenu(null)}
                    onCopyLink={() => handleCopyLink(menu.room)}
                    onEdit={() => handleEditClick(menu.room)}
                    onDelete={() => {
                        setDeleteTarget(menu.room);
                        setMenu(null);
                    }}
                    onLeave={() => {
                        setLeaveTarget(menu.room);
                        setMenu(null);
                    }}
                />
            )}

            {toast && <Toast message={toast} onDone={() => setToast(null)} />}

            {editTarget && (
                <CreateRoomModal
                    mode="edit"
                    initialValues={{
                        name: editTarget.name,
                        description: editTarget.description,
                        tileId: editTarget.theme_id,
                        tags: editTarget.tags ?? [],
                    }}
                    onClose={() => setEditTarget(null)}
                    onSubmit={onEditRoom}
                />
            )}

            {deleteTarget && (
                <ConfirmModal
                    title={deleteTarget.name}
                    subtitle="Delete this room? This action can't be undone."
                    confirmLabel="Delete"
                    danger
                    onClose={() => setDeleteTarget(null)}
                    onConfirm={() => deleteRoomMutation.mutateAsync(deleteTarget.id)}
                />
            )}

            {leaveTarget && (
                <ConfirmModal
                    title={leaveTarget.name}
                    subtitle="Are you sure you want to leave this room?"
                    confirmLabel="Leave"
                    danger
                    onClose={() => setLeaveTarget(null)}
                    onConfirm={() => leaveRoomMutation.mutateAsync(leaveTarget.id)}
                />
            )}
        </div>
    );
}
