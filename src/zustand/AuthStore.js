import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      userData: [],
      userLogin: (user) => set((state) => ({ userData: state.user }, { isAuthenticated: true })),
      userLogout: () => set((state) => ({ userData: state.null }, { isAuthenticated: false })),
      setIsAuthenticated: (value) => set({ isAuthenticated: value })
    }),
    {
      name: 'authenticatedState'
    }
  )
);

export default useAuthStore;
