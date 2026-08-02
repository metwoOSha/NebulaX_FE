'use client';

import clsx from 'clsx';

import cls from './MemberItem.module.css';

interface MemberItemProps {
    username: string;
    avatarColor: string;
    online: boolean;
    isYou?: boolean;
}

export default function MemberItem({ username, avatarColor, online, isYou }: MemberItemProps) {
    const initials = username.charAt(0).toUpperCase();

    return (
        <div className={cls.member}>
            <div className={clsx(cls.avatarWrap, !online && cls.offline)}>
                <div
                    className={cls.avatar}
                    style={{ backgroundImage: `linear-gradient(${avatarColor}, ${avatarColor})` }}
                >
                    <span>{initials}</span>
                </div>
                <span className={clsx(cls.status, online ? cls.online : cls.offlineDot)} />
            </div>
            <span className={clsx(cls.username, !online && cls.usernameOffline)}>{username}</span>
            {isYou && <span className={cls.youBadge}>you</span>}
        </div>
    );
}
