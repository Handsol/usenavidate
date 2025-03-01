import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      userData: null,
      userLogin: (user) => set((state) => ({ userData: user, isAuthenticated: true })),
      userLogout: () => set({ userData: null, isAuthenticated: false })
    }),
    {
      name: 'authenticatedState'
    }
  )
);

export default useAuthStore;
