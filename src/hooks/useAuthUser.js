import { useEffect, useState } from 'react';

export const useAuthUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로그인 정보를 로컬스토리지에서 가져오기
    const storedSession = JSON.parse(localStorage.getItem('session'));

    if (storedSession && storedSession.user) {
      setUser(storedSession.user);
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  return { user, loading };
};
