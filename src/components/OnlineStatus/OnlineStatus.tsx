'use client';

import clsx from 'clsx';
import cls from './OnlineStatus.module.css';

export default function OnlineStatus({ online }: { online: number }) {
    return (
        <div className={cls.onlineBlock}>
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
