import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import naviDateLogo from '/navi_date_purple.png';
import { IoClose } from 'react-icons/io5';
import { PATH } from '../../shared/PATH';
import supabase from '../../supabase/Client';
import { AlertSuccess, AlertError } from '../../common/Alert';

const Header = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSession = JSON.parse(localStorage.getItem('session'));
    setSession(storedSession);
  }, []);

  // 로그아웃
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      AlertError('로그아웃 실패!', '그냥 계세요.');
      return;
    }

    localStorage.removeItem('session');
    setSession(null);

    AlertSuccess('로그아웃 성공!', '다음에 또 만나요!');

    // 로그인 페이지로 이동
    navigate(PATH.LOGIN);
  };

  return (
    // Header
    <nav className="fixed top-0 w-full bg-white text-palette1 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* 햄부기우기 네비게이션 버튼 */}
        <button className="text-2xl focus:outline-none" onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}>
          ☰
        </button>

        {/* useNaviDate() 로고, 클릭 시 홈 화면으로 이동 */}
        <div className="text-2xl font-bold flex items-center">
          <img src={naviDateLogo} alt="로고" className="w-10 h-10 mr-1" />
          <Link to={PATH.HOME}>useNaviDate()</Link>
        </div>

        {/* Login / logout 버튼 */}
        {session ? (
          <button
            onClick={handleLogout}
            className="bg-palette3 hover:bg-palette1 w-20 h-8 flex items-center justify-center rounded-2xl text-palette5 text-md font-medium font-montserrat transition-all duration-300"
          >
            Logout
          </button>
        ) : (
          <Link
            to={PATH.LOGIN}
            className="bg-palette1 hover:bg-palette3 w-20 h-8 flex items-center justify-center rounded-2xl text-palette5 text-md font-medium font-montserrat transition-all duration-300"
          >
            Login
          </Link>
        )}

        {/* 햄부기우기 네비게이션 바 */}
        <div
          className={`fixed left-0 top-0 h-full w-64 bg-palette1  transform transition-transform duration-300 ${
            isHamburgerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* 햄부기우기 닫기 */}
          <button
            className="absolute top-6 left-6 text-white text-xl focus:outline-none"
            onClick={() => setIsHamburgerOpen(false)}
          >
            <IoClose className="text-3xl" />
          </button>

          {/* 햄부기우기는 어디로 갈 수 있나요? */}
          <nav className="mt-24 ml-8 flex flex-col items-start gap-5">
            <Link
              to={PATH.HOME}
              className="text-white text-xl font-semibold tracking-wide hover:text-palette3 transition-all duration-300"
              onClick={() => setIsHamburgerOpen(false)}
            >
              useNaviDate( )
            </Link>
            <Link
              to={PATH.NAVITALK}
              className="text-white text-xl font-semibold tracking-wide hover:text-palette3 transition-all duration-300"
              onClick={() => setIsHamburgerOpen(false)}
            >
              NaviTalk
            </Link>
            <Link
              to={PATH.MYPAGE}
              className="text-white text-xl font-semibold tracking-wide hover:text-palette3 transition-all duration-300"
              onClick={() => setIsHamburgerOpen(false)}
            >
              MyPage
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Header;
