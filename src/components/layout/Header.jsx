import { useState } from 'react';
import { Link } from 'react-router-dom';
import naviDateLogo_purple from '../../../public/naviDateLogo_purple.png';
import { IoClose } from 'react-icons/io5';

const Header = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

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
          <img src={naviDateLogo_purple} alt="로고" className="w-10 h-10 mr-1" />
          <Link to="/">useNaviDate()</Link>
        </div>

        {/* Login 버튼 */}
        <Link
          to="/login"
          className="bg-palette3 hover:bg-palette1 w-20 h-8 flex items-center justify-center rounded-2xl text-palette1 text-lg font-semibold font-montserrat hover:text-palette3 transition-all duration-300"
        >
          Login
        </Link>

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
              to="/"
              className="text-white text-xl font-semibold tracking-wide hover:text-palette3 transition-all duration-300"
              onClick={() => setIsHamburgerOpen(false)}
            >
              useNaviDate( )
            </Link>
            <Link
              to="/navitalk"
              className="text-white text-xl font-semibold tracking-wide hover:text-palette3 transition-all duration-300"
              onClick={() => setIsHamburgerOpen(false)}
            >
              NaviTalk
            </Link>
            <Link
              to="/mypage"
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
