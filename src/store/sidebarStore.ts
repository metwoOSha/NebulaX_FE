import { create } from 'zustand';

interface SidebarStore {
    isRoomsSidebarOpen: boolean;
    isMembersSidebarOpen: boolean;
    isRoomsSidebarCollapsed: boolean;
    roomsSidebarWidth: number;
    toggleRoomsSidebarOpen: () => void;
    toggleMembersSidebar: () => void;
    setRoomsSidebarOpen: (open: boolean) => void;
    setMembersSidebarOpen: (open: boolean) => void;
    setRoomsSidebarCollapsed: (collapsed: boolean) => void;
    setRoomsSidebarWidth: (width: number) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
    isRoomsSidebarOpen: true,
    isMembersSidebarOpen: true,
    isRoomsSidebarCollapsed: false,
    roomsSidebarWidth: 256,
    toggleRoomsSidebarOpen: () => set((state) => ({ isRoomsSidebarOpen: !state.isRoomsSidebarOpen })),
    toggleMembersSidebar: () => set((state) => ({ isMembersSidebarOpen: !state.isMembersSidebarOpen })),
    setRoomsSidebarOpen: (open) => set({ isRoomsSidebarOpen: open }),
    setMembersSidebarOpen: (open) => set({ isMembersSidebarOpen: open }),
    setRoomsSidebarCollapsed: (collapsed) => set({ isRoomsSidebarCollapsed: collapsed }),
    setRoomsSidebarWidth: (width) => set({ roomsSidebarWidth: width }),
}));
