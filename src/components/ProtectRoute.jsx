import { useNavigate } from 'react-router-dom';
import { PATH } from '../shared/PATH';
import { useEffect } from 'react';
import { AlertError } from '../common/Alert';
import { useAuthUser } from '../hooks/useAuthUser';

const ProtectRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, loading } = useAuthUser();

  useEffect(() => {
    if (!loading && !user) {
      AlertError('잠깐!', '로그인이 필요한 페이지입니다.');
      navigate(PATH.LOGIN);
    }
  }, [user, loading, navigate]);

  return children;
};

export default ProtectRoute;
