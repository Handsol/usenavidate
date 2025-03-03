import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  // persist를 사용시 새로고침해도 날아가지 않음
  persist(
    (set) => ({
      // 인증되어있는지 확인
      isAuthenticated: false,
      //   supabase에서 userData를 받아 사용하는 용도
      userData: null, // auth table 완성되면 해당 부분 수정 필요
      // 로그인 state 관리
      userLogin: (user) => set((state) => ({ userData: user, isAuthenticated: true })),
      // 로그아웃 state 관리
      userLogout: () => set({ userData: null, isAuthenticated: false })
    }),
    {
      name: 'authenticatedState' //localStorage에 저장될 이름
    }
  )
);

export default useAuthStore;
