'use client';

import { useRef, useState } from 'react';
import clsx from 'clsx';
import cls from './MemberSidebar.module.css';
import Buttons from '@/components/Buttons/Buttons';
import MemberItem from '@/components/MemberItem/MemberItem';
import MemberProfileModal from '@/components/Modals/MemberProfileModal/MemberProfileModal';
import { useSocketStore } from '@/store/socketStore';
import { useAuthStore } from '@/store/authStore';
import { useSidebarStore } from '@/store/sidebarStore';
import { useRoomMembers } from '@/hooks/useRoomMembers';
import { useSwipeToClose } from '@/hooks/useSwipeToClose';
import { getAvatarColorById } from '@/config/avatars.config';
import type { RoomMember } from '@/types/room.types';

interface MemberSidebarProps {
    roomId: string;
    isOpen: boolean;
}

export default function MemberSidebar({ roomId, isOpen }: MemberSidebarProps) {
    const { onlineUserIds } = useSocketStore();
    const { user } = useAuthStore();
    const { setMembersSidebarOpen } = useSidebarStore();
    const { data } = useRoomMembers(roomId);
    const [selectedMember, setSelectedMember] = useState<RoomMember | null>(null);
    const rootRef = useRef<HTMLDivElement>(null);

    useSwipeToClose(rootRef, 'right', () => setMembersSidebarOpen(false));

    const members = data?.members ?? [];
    const onlineIds = user && !onlineUserIds.includes(user.id) ? [...onlineUserIds, user.id] : onlineUserIds;
    const byYouFirst = (a: { id: string }, b: { id: string }) => Number(b.id === user?.id) - Number(a.id === user?.id);
    const onlineMembers = members.filter((member) => onlineIds.includes(member.id)).sort(byYouFirst);
    const offlineMembers = members.filter((member) => !onlineIds.includes(member.id)).sort(byYouFirst);

    return (
        <div ref={rootRef} className={clsx(cls.onlineSidebar, isOpen && cls.open)}>
            <div className={cls.onlineBlock}>
                <Buttons type="close" onClick={() => setMembersSidebarOpen(false)} className={cls.closeBtn} />
                <div className={cls.label}>
                    Online — <span>{onlineMembers.length}</span>
                </div>
                <div className={cls.onlineList}>
                    {onlineMembers.map((member) => (
                        <MemberItem
                            key={member.id}
                            username={member.username}
                            avatarColor={getAvatarColorById(member.avatar_color_id)}
                            online
                            isYou={member.id === user?.id}
                            onClick={() => setSelectedMember(member)}
                        />
                    ))}
                </div>

                {offlineMembers.length > 0 && (
                    <>
                        <div className={cls.label}>
                            Offline — <span>{offlineMembers.length}</span>
                        </div>
                        <div className={cls.offlineList}>
                            {offlineMembers.map((member) => (
                                <MemberItem
                                    key={member.id}
                                    username={member.username}
                                    avatarColor={getAvatarColorById(member.avatar_color_id)}
                                    online={false}
                                    isYou={member.id === user?.id}
                                    onClick={() => setSelectedMember(member)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {selectedMember && (
                <MemberProfileModal
                    member={selectedMember}
                    online={onlineIds.includes(selectedMember.id)}
                    onClose={() => setSelectedMember(null)}
                />
            )}
        </div>
    );
}
