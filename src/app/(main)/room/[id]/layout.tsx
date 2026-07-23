import RoomLayout from '@/layout/RoomLayout/RoomLayout';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <RoomLayout>{children}</RoomLayout>;
}
