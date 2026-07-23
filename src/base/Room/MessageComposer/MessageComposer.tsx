'use client';

import Input from '@/components/Input/Input';
import cls from './MessageComposer.module.css';
import Buttons from '@/components/Buttons/Buttons';

export default function MessageComposer() {
    return (
        <div className={cls.messageComposer}>
            <Input />
            <Buttons type="send" />
        </div>
    );
}
