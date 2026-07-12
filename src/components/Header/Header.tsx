'use client';

import { usePathname, useRouter } from 'next/navigation';
import IconBadge from '../IconBadge/IconBadge';
import Buttons from '../Buttons/Buttons';
import cls from './Header.module.css';

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();

    const isRoom = pathname.startsWith('/room/');

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
                <Buttons type="profile" username="Dmytro" avatarColor="#5865f2" onClick={() => {}} />
            </div>
        </header>
    );
}
