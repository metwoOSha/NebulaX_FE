import RoomLayout from '@/layout/RoomLayout/RoomLayout';

export default async function Layout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}>) {
    const { id } = await params;
    return <RoomLayout roomId={id}>{children}</RoomLayout>;
}
