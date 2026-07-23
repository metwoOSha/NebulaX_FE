'use client';

import { Group, Panel, Separator } from 'react-resizable-panels';
import cls from './RoomLayout.module.css';
import RoomsSidebar from '@/components/RoomsSidebar/RoomsSidebar';
import MemberSidebar from '@/components/MemberSidebar/MemberSidebar';

export default function RoomLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={cls.wrapper}>
            <Group>
                <Panel defaultSize={256} minSize={72} maxSize={420}>
                    <RoomsSidebar />
                </Panel>

                <Separator className={cls.resizer}>
                    <div className={cls.resizerBar} />
                </Separator>

                <Panel>{children}</Panel>
            </Group>
            <MemberSidebar />
        </div>
    );
}
