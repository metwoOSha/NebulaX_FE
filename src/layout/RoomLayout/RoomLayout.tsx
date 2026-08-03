'use client';

import { useEffect, useRef } from 'react';
import { Group, Panel, Separator, PanelImperativeHandle } from 'react-resizable-panels';
import clsx from 'clsx';
import cls from './RoomLayout.module.css';
import RoomsSidebar from '@/components/RoomsSidebar/RoomsSidebar';
import MemberSidebar from '@/components/MemberSidebar/MemberSidebar';
import { useSidebarStore } from '@/store/sidebarStore';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function RoomLayout({ children, roomId }: { children: React.ReactNode; roomId: string }) {
    const {
        isRoomsSidebarOpen,
        isMembersSidebarOpen,
        isRoomsSidebarCollapsed,
        roomsSidebarWidth,
        setRoomsSidebarOpen,
        setMembersSidebarOpen,
        setRoomsSidebarCollapsed,
        setRoomsSidebarWidth,
    } = useSidebarStore();
    const roomsPanelRef = useRef<PanelImperativeHandle>(null);
    const isMobile = useIsMobile();
    const hasAppliedMobileDefault = useRef(false);

    // Both panels default to open for desktop; on a phone they should start as closed
    // drawers instead. `isMobile` reads `false` on the very first client render (the
    // SSR-safe snapshot, to avoid a hydration mismatch) and only flips to its real value
    // on a follow-up render — so this can't be a mount-only (empty-deps) effect, it has to
    // wait for that real value and then apply the correction exactly once, not on every
    // later resize/rotation (which would rudely slam the drawers shut mid-session).
    useEffect(() => {
        if (isMobile && !hasAppliedMobileDefault.current) {
            hasAppliedMobileDefault.current = true;
            setRoomsSidebarOpen(false);
            setMembersSidebarOpen(false);
        }
    }, [isMobile, setRoomsSidebarOpen, setMembersSidebarOpen]);

    const closeMobilePanels = () => {
        setRoomsSidebarOpen(false);
        setMembersSidebarOpen(false);
    };

    // The rooms Panel/Separator must always stay mounted in the Group — react-resizable-panels
    // corrupts its internal layout bookkeeping if a Panel is added/removed at runtime (throws
    // "Invalid N panel layout" later, even from an unrelated ResizeObserver tick). So "closed" is
    // a pure CSS override (#rooms-sidebar-panel below) instead of unmounting anything — the
    // library's own layout state is never touched, so reopening just reveals whatever size it
    // still has on file.
    return (
        <div className={clsx(cls.wrapper, !isRoomsSidebarOpen && cls.roomsClosed)}>
            <Group>
                <Panel
                    id="rooms-sidebar-panel"
                    defaultSize={isRoomsSidebarCollapsed ? 72 : roomsSidebarWidth}
                    minSize={180}
                    maxSize={420}
                    collapsible
                    collapsedSize={72}
                    groupResizeBehavior="preserve-pixel-size"
                    panelRef={roomsPanelRef}
                    onResize={(panelSize) => {
                        const collapsed = roomsPanelRef.current?.isCollapsed() ?? false;
                        setRoomsSidebarCollapsed(collapsed);
                        if (!collapsed) setRoomsSidebarWidth(panelSize.inPixels);
                    }}
                >
                    <RoomsSidebar isCollapsed={isRoomsSidebarCollapsed} />
                </Panel>

                <Separator className={clsx(cls.resizer, !isRoomsSidebarOpen && cls.resizerHidden)}>
                    <div className={cls.resizerBar} />
                </Separator>

                <Panel id="room-content-panel" className={isMembersSidebarOpen ? cls.contentPadded : undefined}>
                    {children}
                </Panel>
            </Group>
            {/* Positioned absolutely (see MemberSidebar.module.css) so it overlays the content Panel
                instead of sitting in the flex row — mounting/unmounting it never resizes Group's own
                box, so it can't trigger the layout corruption the rooms Panel above works around.
                Always mounted (not conditional) so its mobile slide-in/out transform can animate —
                on desktop it's still just CSS display:none when closed, unchanged from before. */}
            <MemberSidebar roomId={roomId} isOpen={isMembersSidebarOpen} />

            {/* Mobile-only backdrop: hidden above the breakpoint via CSS, so no viewport check needed here. */}
            {(isRoomsSidebarOpen || isMembersSidebarOpen) && (
                <div className={cls.backdrop} onClick={closeMobilePanels} />
            )}
        </div>
    );
}
