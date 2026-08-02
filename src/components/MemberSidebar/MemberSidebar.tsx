'use client';

import cls from './MemberSidebar.module.css';
import MemberItem from '@/components/MemberItem/MemberItem';
import { useSocketStore } from '@/store/socketStore';
import { useAuthStore } from '@/store/authStore';
import { useRoomMembers } from '@/hooks/useRoomMembers';
import { getAvatarColorById } from '@/config/avatars.config';

interface MemberSidebarProps {
    roomId: string;
}

export default function MemberSidebar({ roomId }: MemberSidebarProps) {
    const { onlineUserIds } = useSocketStore();
    const { user } = useAuthStore();
    const { data } = useRoomMembers(roomId);

    const members = data?.members ?? [];
    const onlineIds = user && !onlineUserIds.includes(user.id) ? [...onlineUserIds, user.id] : onlineUserIds;
    const byYouFirst = (a: { id: string }, b: { id: string }) => Number(b.id === user?.id) - Number(a.id === user?.id);
    const onlineMembers = members.filter((member) => onlineIds.includes(member.id)).sort(byYouFirst);
    const offlineMembers = members.filter((member) => !onlineIds.includes(member.id)).sort(byYouFirst);

    return (
        <div className={cls.onlineSidebar}>
            <div className={cls.onlineBlock}>
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
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
