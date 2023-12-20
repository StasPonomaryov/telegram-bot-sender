import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface IGlobalState {
  messageType: string;
  setMessageType: (messageType: string) => void;
}

export const useGlobalState = create<IGlobalState>()(
  persist(
    (set) => ({
      messageType: 'plain',
      setMessageType: (messageType: string) => set({ messageType }),
    }),
    {
      name: 'global-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
