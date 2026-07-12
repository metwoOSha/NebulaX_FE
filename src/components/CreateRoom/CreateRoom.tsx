'use client';

import cls from './CreateRoom.module.css';

export default function CreateRoom() {
    return (
        <div className={cls.create}>
            <div className={cls.plus}>+</div>
            <div className={cls.title}>Create a new room</div>
        </div>
    );
}
