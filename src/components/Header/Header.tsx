'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import IconBadge from '../IconBadge/IconBadge';
import Buttons from '../Buttons/Buttons';
import ProfileModal from '../Modals/ProfileModal/ProfileModal';
import cls from './Header.module.css';

import { useAuthStore } from '@/store/authStore';
import { getAvatarColorById } from '@/config/avatars.config';

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();

    const isRoom = pathname.startsWith('/room/');

    const { user } = useAuthStore();
    const [isProfileOpen, setProfileOpen] = useState(false);

    return (
        <header className={cls.header}>
            <div className={cls.leftSide}>
                {isRoom && <Buttons type="back" onClick={() => router.back()} />}
                <IconBadge tileId={0} size="label" />
                <span className={cls.logoTitle}>NebulaX</span>
            </div>
            <div className={cls.rightSide}>
                {isRoom && <Buttons type="action" action="menu" onClick={() => {}} />}
                {isRoom && <Buttons type="action" action="members" onClick={() => {}} />}
                <Buttons type="action" action="theme" />
                <Buttons
                    type="profile"
                    username={user?.username}
                    avatarColor={getAvatarColorById(user?.avatar_color_id ?? 1)}
                    onClick={() => setProfileOpen(true)}
                />
            </div>

            {isProfileOpen && <ProfileModal onClose={() => setProfileOpen(false)} />}
        </header>
    );
}
