import RoomChat from '@/base/Room/RoomChat/RoomChat';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <RoomChat roomId={id} />;
}
