import { useEffect, useState } from 'react';
import supabase from '../supabase/Client';

export const useAuthUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('유저 정보 가져오기 실패:', error);
      } else {
        setUser(data?.user);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
};
