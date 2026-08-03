'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import IconBadge from '../IconBadge/IconBadge';
import Buttons from '../Buttons/Buttons';
import ProfileModal from '../Modals/ProfileModal/ProfileModal';
import cls from './Header.module.css';

import { useAuthStore } from '@/store/authStore';
import { useSidebarStore } from '@/store/sidebarStore';
import { getAvatarColorById } from '@/config/avatars.config';

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();

    const isRoom = pathname.startsWith('/room/');

    const { user } = useAuthStore();
    const { isRoomsSidebarOpen, isMembersSidebarOpen, toggleRoomsSidebarOpen, toggleMembersSidebar } =
        useSidebarStore();
    const [isProfileOpen, setProfileOpen] = useState(false);

    return (
        <header className={cls.header}>
            <div className={clsx(cls.leftSide, isRoom && cls.leftSideInRoom)}>
                {isRoom && <Buttons type="back" onClick={() => router.push('/')} />}
                <IconBadge tileId={0} size="label" />
                <span className={cls.logoTitle}>NebulaX</span>
            </div>
            <div className={clsx(cls.rightSide, isRoom && cls.rightSideInRoom)}>
                {isRoom && (
                    <Buttons
                        type="action"
                        action="menu"
                        isActive={isRoomsSidebarOpen}
                        onClick={toggleRoomsSidebarOpen}
                    />
                )}
                {isRoom && (
                    <Buttons
                        type="action"
                        action="members"
                        isActive={isMembersSidebarOpen}
                        onClick={toggleMembersSidebar}
                    />
                )}
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
