'use client';

import clsx from 'clsx';
import cls from './OnlineStatus.module.css';

export default function OnlineStatus({ online, type }: { online: number; type: 'card' | 'room' }) {
    return (
        <div
            className={clsx(cls.onlineBlock, {
                [cls.room]: type === 'room',
                [cls.card]: type === 'card',
            })}
        >
            <span
                className={clsx(cls.dot, {
                    [cls.offline]: online === 0,
                    [cls.online]: online >= 1,
                })}
            ></span>
            <span>{`${online} online`}</span>
        </div>
    );
}
