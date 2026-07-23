'use client';

import cls from './MemberSidebar.module.css';

export default function MemberSidebar() {
    return (
        <div className={cls.onlineSidebar}>
            <div className={cls.onlineBlock}>
                <div className={cls.label}>
                    Online — <span>5</span>
                </div>
                <div className={cls.onlineList}></div>
                <div className={cls.label}>
                    Offline — <span>1</span>
                </div>
                <div className={cls.offlinelist}></div>
            </div>
        </div>
    );
}
