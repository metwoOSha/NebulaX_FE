'use client';

import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import cls from './RoomsSidebar.module.css';
import RoomListItem from '@/components/RoomListItem/RoomListItem';
import { useRooms } from '@/hooks/useRooms';
import { useSidebarStore } from '@/store/sidebarStore';
import { useSwipeToClose } from '@/hooks/useSwipeToClose';

export default function RoomsSidebar({ isCollapsed }: { isCollapsed?: boolean }) {
    const pathname = usePathname();
    const { data, isLoading } = useRooms();
    const { setRoomsSidebarOpen } = useSidebarStore();
    const asideRef = useRef<HTMLElement>(null);

    useSwipeToClose(asideRef, 'left', () => setRoomsSidebarOpen(false));

    const rooms = [...(data?.my ?? []), ...(data?.joined ?? [])];

    return (
        <aside ref={asideRef} className={cls.sidebar}>
            {!isCollapsed && <div className={cls.label}>My rooms</div>}
            <div className={cls.list}>
                {isLoading
                    ? Array.from({ length: 4 }).map((_, index) => (
                          <div key={index} className={clsx('skeleton', cls.skeletonItem)} />
                      ))
                    : rooms.map((room) => (
                          <RoomListItem
                              key={room.id}
                              room={room}
                              isActive={pathname === `/room/${room.id}`}
                              isCollapsed={isCollapsed}
                          />
                      ))}
            </div>
        </aside>
    );
}
