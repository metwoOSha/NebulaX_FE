'use client';

import { forwardRef, useState } from 'react';

import Input from '@/components/Input/Input';
import cls from './TopicPicker.module.css';

interface TopicPickerProps {
    options: string[];
    selected: string[];
    onSelect: (topic: string) => void;
}

const TopicPicker = forwardRef<HTMLDivElement, TopicPickerProps>(function TopicPicker(
    { options, selected, onSelect },
    ref
) {
    const [search, setSearch] = useState('');

    const available = options
        .filter((topic) => !selected.includes(topic))
        .filter((topic) => topic.toLowerCase().includes(search.toLowerCase()));

    return (
        <div ref={ref} className={cls.panel}>
            <Input
                variant="chat"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tags…"
                className={cls.search}
                autoFocus
            />
            <div className={cls.list}>
                {available.length > 0 ? (
                    available.map((topic) => (
                        <button key={topic} type="button" onClick={() => onSelect(topic)} className={cls.chip}>
                            {topic}
                        </button>
                    ))
                ) : (
                    <span className={cls.empty}>No matching tags</span>
                )}
            </div>
        </div>
    );
});

export default TopicPicker;
