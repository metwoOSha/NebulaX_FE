'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useMessages } from '@/hooks/useMessages';
import { useRoom } from '@/hooks/useRoom';
import { useRoomById } from '@/hooks/useRoomById';
import { useJoinRoom } from '@/hooks/useJoinRoom';
import JoinRoomModal from '@/components/Modals/JoinRoomModal/JoinRoomModal';
import MessageComposer from '../MessageComposer/MessageComposer';
import MessageList from '../MessageList/MessageList';
import RoomHeader from '../RoomHeader/RoomHeader';
import cls from './RoomChat.module.css';

interface RoomChatProps {
    roomId: string;
}

export default function RoomChat({ roomId }: RoomChatProps) {
    const { user } = useAuthStore();
    const router = useRouter();
    const { data: roomData, isLoading: loadingRoom, isError } = useRoomById(roomId);
    const joinRoomMutation = useJoinRoom();

    const room = roomData?.room;
    const isMember = room ? room.role != null : false;

    const { messages: realtimeMessages, onlineUsers, typingUsers, sendMessage, sendTyping } = useRoom(roomId, isMember);
    const { data, fetchNextPage, hasNextPage, isLoading: loadingMessages } = useMessages(roomId, isMember);

    const historyMessages = data?.pages.flatMap((page) => page.messages) ?? [];
    const historyIds = new Set(historyMessages.map((message) => message.id));
    const newRealtimeMessages = realtimeMessages.filter((message) => !historyIds.has(message.id));
    const messages = [...historyMessages, ...newRealtimeMessages];

    if (loadingRoom) return null;

    if (isError || !room) {
        return (
            <div className={cls.roomChat}>
                <div className={cls.notFound}>Room not found</div>
            </div>
        );
    }

    if (!isMember) {
        return (
            <JoinRoomModal
                room={room}
                onClose={() => router.push('/')}
                onConfirm={() => joinRoomMutation.mutateAsync(roomId)}
            />
        );
    }

    return (
        <div className={cls.roomChat}>
            <RoomHeader
                room={room}
                online={onlineUsers.length}
                typingUsernames={typingUsers.map((typingUser) => typingUser.username)}
            />
            <MessageList
                messages={messages}
                currentUserId={user?.id}
                hasNextPage={hasNextPage}
                onLoadMore={fetchNextPage}
                loadingMessages={loadingMessages}
            />
            <MessageComposer roomName={room?.name} onSend={sendMessage} onTyping={sendTyping} />
        </div>
    );
}
