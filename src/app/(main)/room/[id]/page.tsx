import RoomChat from '@/base/Room/RoomChat/RoomChat';

export default function page({ params }: { params: { id: string } }) {
    return <RoomChat roomId={params.id} />;
}
