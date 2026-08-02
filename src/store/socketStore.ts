import { create } from 'zustand';
import { Socket } from 'socket.io-client';

interface SocketStore {
    socket: Socket | null;
    onlineUserIds: string[];
    setSocket: (socket: Socket | null) => void;
    setOnlineUserIds: (ids: string[]) => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
    socket: null,
    onlineUserIds: [],
    setSocket: (socket) => set({ socket }),
    setOnlineUserIds: (ids) => set({ onlineUserIds: ids }),
}));
