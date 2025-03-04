import { useNavigate } from 'react-router-dom';
import { PATH } from '../shared/PATH';
import { useEffect } from 'react';
import { AlertError } from '../common/Alert';

const ProtectRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));

    if (!session) {
      AlertError('잠깐!', '로그인이 필요한 페이지입니다.');
      navigate(PATH.LOGIN);
    }
  }, [navigate]);

  return children;
};

export default ProtectRoute;
