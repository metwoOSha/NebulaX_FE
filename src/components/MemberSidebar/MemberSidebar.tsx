'use client';

import cls from './MemberSidebar.module.css';
import MemberItem from '@/components/MemberItem/MemberItem';

const ONLINE_MEMBERS = [
    { username: 'Nova', avatarColor: '#5865f2', isYou: true },
    { username: 'Alex', avatarColor: '#3ba55d' },
    { username: 'Sam', avatarColor: '#00a8fc' },
    { username: 'Jordan', avatarColor: '#faa61a' },
    { username: 'Casey', avatarColor: '#eb459e' },
];

const OFFLINE_MEMBERS = [{ username: 'Riley', avatarColor: '#9b59b6' }];

export default function MemberSidebar() {
    return (
        <div className={cls.onlineSidebar}>
            <div className={cls.onlineBlock}>
                <div className={cls.label}>
                    Online — <span>{ONLINE_MEMBERS.length}</span>
                </div>
                <div className={cls.onlineList}>
                    {ONLINE_MEMBERS.map((member) => (
                        <MemberItem key={member.username} {...member} online />
                    ))}
                </div>
                <div className={cls.label}>
                    Offline — <span>{OFFLINE_MEMBERS.length}</span>
                </div>
                <div className={cls.offlinelist}>
                    {OFFLINE_MEMBERS.map((member) => (
                        <MemberItem key={member.username} {...member} online={false} />
                    ))}
                </div>
            </div>
        </div>
    );
}
