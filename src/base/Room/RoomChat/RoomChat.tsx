'use client';

import { useAuthStore } from '@/store/authStore';
import { useMessages } from '@/hooks/useMessages';
import { useRoom } from '@/hooks/useRoom';
import MessageComposer from '../MessageComposer/MessageComposer';
import MessageList from '../MessageList/MessageList';
import RoomHeader from '../RoomHeader/RoomHeader';
import cls from './RoomChat.module.css';

interface RoomChatProps {
    roomId: string;
}

export default function RoomChat({ roomId }: RoomChatProps) {
    const { user } = useAuthStore();
    const { messages: realtimeMessages, typingUsers, sendMessage, sendTyping } = useRoom(roomId);
    const { data, fetchNextPage, hasNextPage } = useMessages(roomId);

    const historyMessages = data?.pages.flatMap((page) => page.messages) ?? [];
    const messages = [...historyMessages, ...realtimeMessages];

    return (
        <div className={cls.roomChat}>
            <RoomHeader typingUsernames={typingUsers.map((typingUser) => typingUser.username)} />
            <MessageList
                messages={messages}
                currentUserId={user?.id}
                hasNextPage={hasNextPage}
                onLoadMore={fetchNextPage}
            />
            <MessageComposer onSend={sendMessage} onTyping={sendTyping} />
        </div>
    );
}
