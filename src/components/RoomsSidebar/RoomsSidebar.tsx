'use cleint';

import cls from './RoomsSidebar.module.css';

export default function RoomsSidebar() {
    return (
        <aside className={cls.sidebar}>
            <div className={cls.label}>My rooms</div>
            <div></div>
        </aside>
    );
}
