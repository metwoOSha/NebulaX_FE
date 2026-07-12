import Header from '@/components/Header/Header';
import Aurora from '@/components/Aurora/Aurora';
import cls from './MainLayout.module.css';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Aurora />
            <div className={cls.layout}>
                <Header />
                <main className={cls.main}>{children}</main>
            </div>
        </>
    );
}
