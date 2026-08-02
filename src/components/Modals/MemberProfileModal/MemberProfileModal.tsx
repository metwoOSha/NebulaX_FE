'use client';

import clsx from 'clsx';
import Buttons from '@/components/Buttons/Buttons';
import { useUserById } from '@/hooks/useUserById';
import { getAvatarColorById } from '@/config/avatars.config';
import type { RoomMember } from '@/types/room.types';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import cls from './MemberProfileModal.module.css';

interface MemberProfileModalProps {
    member: RoomMember;
    online: boolean;
    onClose: () => void;
}

export default function MemberProfileModal({ member, online, onClose }: MemberProfileModalProps) {
    const { data } = useUserById(member.id);
    const profile = data?.user;

    const avatarColor = getAvatarColorById(member.avatar_color_id);
    const initials = member.username.charAt(0).toUpperCase();
    const tags = profile?.tags ?? [];

    return (
        <ModalOverlay width={320} padding="0">
            <div
                className={cls.banner}
                style={{
                    backgroundImage: `linear-gradient(135deg, ${avatarColor}, color-mix(in srgb, ${avatarColor} 55%, black))`,
                }}
            />

            <div className={cls.body}>
                <div className={cls.avatarWrap}>
                    <div
                        className={cls.avatar}
                        style={{ backgroundImage: `linear-gradient(${avatarColor}, ${avatarColor})` }}
                    >
                        <span>{initials}</span>
                    </div>
                    <span className={clsx(cls.status, online ? cls.online : cls.offline)} />
                </div>

                <div className={cls.name}>{profile?.name || member.username}</div>
                <div className={clsx(cls.presence, online ? cls.presenceOnline : cls.presenceOffline)}>
                    {online ? 'Online' : 'Offline'}
                </div>

                <div className={cls.divider} />

                <div className={cls.sectionLabel}>Role</div>
                <div className={cls.roleValue}>{member.role === 'admin' ? 'Admin' : 'Member'}</div>

                {tags.length > 0 && (
                    <>
                        <div className={cls.sectionLabel}>Interests</div>
                        <div className={cls.chips}>
                            {tags.map((tag) => (
                                <span key={tag} className={cls.chip}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </>
                )}

                {profile?.about && (
                    <>
                        <div className={cls.sectionLabel}>About</div>
                        <div className={cls.about}>{profile.about}</div>
                    </>
                )}

                <Buttons type="ghost" label="Close" onClick={onClose} className={cls.closeBtn} />
            </div>
        </ModalOverlay>
    );
}
