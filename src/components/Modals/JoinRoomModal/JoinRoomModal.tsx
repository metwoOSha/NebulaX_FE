'use client';

import { useState } from 'react';
import Buttons from '@/components/Buttons/Buttons';
import IconBadge from '@/components/IconBadge/IconBadge';
import type { Room } from '@/types/room.types';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import cls from './JoinRoomModal.module.css';

interface JoinRoomModalProps {
    room: Room;
    onClose: () => void;
    onConfirm: () => Promise<void>;
}

export default function JoinRoomModal({ room, onClose, onConfirm }: JoinRoomModalProps) {
    const [isJoining, setJoining] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleJoin = async () => {
        setJoining(true);
        setError(null);
        try {
            await onConfirm();
        } catch (err) {
            setJoining(false);
            setError(err instanceof Error ? err.message : 'Failed to join room');
        }
    };

    return (
        <ModalOverlay width={360} padding="22px 26px 26px">
            <div className={cls.topBar}>
                <Buttons type="close" onClick={onClose} />
            </div>

            <div className={cls.header}>
                <IconBadge tileId={room.theme_id} size="md" />
                <div className={cls.title}>{room.name}</div>
                <div className={cls.subtitle}>Do you want to join this room?</div>
            </div>

            {error && <span className={cls.error}>{error}</span>}

            <div className={cls.actions}>
                <Buttons type="ghost" label="Cancel" onClick={onClose} disabled={isJoining} className={cls.action} />
                <Buttons
                    type="primary"
                    label={isJoining ? 'Joining…' : 'Join'}
                    onClick={handleJoin}
                    disabled={isJoining}
                    className={cls.action}
                />
            </div>
        </ModalOverlay>
    );
}
