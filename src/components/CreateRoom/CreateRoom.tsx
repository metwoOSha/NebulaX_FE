'use client';

import cls from './CreateRoom.module.css';

interface CreateRoomProps {
    onClick?: () => void;
}

export default function CreateRoom({ onClick }: CreateRoomProps) {
    return (
        <div className={cls.create} onClick={onClick}>
            <div className={cls.plus}>+</div>
            <div className={cls.title}>Create a new room</div>
        </div>
    );
}
