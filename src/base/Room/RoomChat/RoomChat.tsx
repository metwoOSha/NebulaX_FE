'use client';

import { useAuthStore } from '@/store/authStore';
import { useMessages } from '@/hooks/useMessages';
import { useRoom } from '@/hooks/useRoom';
import { useRoomById } from '@/hooks/useRoomById';
import MessageComposer from '../MessageComposer/MessageComposer';
import MessageList from '../MessageList/MessageList';
import RoomHeader from '../RoomHeader/RoomHeader';
import cls from './RoomChat.module.css';

interface RoomChatProps {
    roomId: string;
}

export default function RoomChat({ roomId }: RoomChatProps) {
    const { user } = useAuthStore();
    const { messages: realtimeMessages, onlineUsers, typingUsers, sendMessage, sendTyping } = useRoom(roomId);
    const { data, fetchNextPage, hasNextPage, isLoading: loadingMessages } = useMessages(roomId);
    const { data: roomData } = useRoomById(roomId);

    const historyMessages = data?.pages.flatMap((page) => page.messages) ?? [];
    const historyIds = new Set(historyMessages.map((message) => message.id));
    const newRealtimeMessages = realtimeMessages.filter((message) => !historyIds.has(message.id));
    const messages = [...historyMessages, ...newRealtimeMessages];
    const room = roomData?.room;

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
