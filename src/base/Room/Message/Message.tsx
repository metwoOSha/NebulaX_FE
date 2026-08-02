'use client';

import clsx from 'clsx';

import Buttons from '@/components/Buttons/Buttons';
import cls from './Message.module.css';

interface MessageProps {
    text: string;
    username: string;
    avatarColor: string;
    time: string;
    isOwn?: boolean;
}

export default function Message({ text, username, avatarColor, time, isOwn }: MessageProps) {
    return (
        <div className={clsx(cls.message, isOwn && cls.own)}>
            {!isOwn && (
                <Buttons type="profile" username={username} avatarColor={avatarColor} ariaLabel={username} compact />
            )}
            <div className={cls.content}>
                {!isOwn && <span className={cls.username}>{username}</span>}
                <div className={cls.bubble}>{text}</div>
                <span className={cls.time}>{time}</span>
            </div>
        </div>
    );
}
