'use client';

import { RefObject, useEffect, useRef } from 'react';

import TopicPicker from '@/components/TopicPicker/TopicPicker';
import { useTags } from '@/hooks/useTags';
import cls from './TagsPicker.module.css';

interface TagsPickerProps {
    value: string[];
    onChange: (tags: string[]) => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    panelRef?: RefObject<HTMLDivElement | null>;
    label?: string;
}

export default function TagsPicker({ value, onChange, open, onOpenChange, panelRef, label = 'Tags' }: TagsPickerProps) {
    const { data: tags = [] } = useTags();
    const options = tags.map((tag) => tag.name);

    const chipsRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (chipsRef.current) chipsRef.current.scrollTop = chipsRef.current.scrollHeight;
    }, [value.length]);

    const addTag = (tag: string) => onChange([...value, tag]);
    const removeTag = (tag: string) => onChange(value.filter((t) => t !== tag));

    return (
        <div>
            {label && <div className={cls.label}>{label}</div>}

            <div ref={chipsRef} className={cls.chips}>
                {value.map((tag) => (
                    <button key={tag} type="button" onClick={() => removeTag(tag)} className={cls.selectedChip}>
                        <span>{tag}</span> ✕
                    </button>
                ))}
                {!open && (
                    <button type="button" onClick={() => onOpenChange(true)} className={cls.addTrigger}>
                        + Add tag
                    </button>
                )}
            </div>

            {open && <TopicPicker ref={panelRef} options={options} selected={value} onSelect={addTag} />}
        </div>
    );
}
