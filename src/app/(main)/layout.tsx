import { AuthInitializer } from '@/utils/AuthInitializer';
import MainLayout from '@/layout/MainLayout/MainLayout';

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <MainLayout>
            <AuthInitializer />
            {children}
        </MainLayout>
    );
}
