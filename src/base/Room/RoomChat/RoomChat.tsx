'use client';

import MessageComposer from '../MessageComposer/MessageComposer';
import MessageList from '../MessageList/MessageList';
import RoomHeader from '../RoomHeader/RoomHeader';
import cls from './RoomChat.module.css';

export default function RoomChat() {
    return (
        <div className={cls.roomChat}>
            <RoomHeader />
            <MessageList />
            <MessageComposer />
        </div>
    );
}
