import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import MyPage from '../pages/MyPage';
import DateRoutePage from '../pages/DateRoutePage';
import DateRouteDetail from '../pages/detail/DateRouteDetail';
import WritePostPage from '../pages/WritePostPage';
import NaviTalkPage from '../pages/NaviTalkPage';
import NaviTalkDetail from '../pages/detail/NaviTalkDetail';
import DateRouteWritePage from '../pages/DateRouteWritePage';
import ProfilePage from '../pages/ProfilePage';
import { PATH } from './PATH';
import ProtectRoute from '../components/ProtectRoute';

const Router = () => {
  return (
    <BrowserRouter>
      {/* Header 컴포넌트 전역 적용 */}
      <Header />
      <RouterContents />
    </BrowserRouter>
  );
};

// Header 높이만큼의 padding 값이 필요없는 경우에 대한 처리
const RouterContents = () => {
  const location = useLocation();

  // 상단의 패딩값(헤더 높이만큼 pt-20 적용됨) 이 필요 없는 페이지 리스트
  const fullScreenPages = [PATH.LOGIN, PATH.SIGNUP, PATH.MYPAGE];

  return (
    <div className={`${fullScreenPages.includes(location.pathname) ? '' : 'pt-20'}`}>
      <Routes>
        {/* 누구나 접근 가능한 페이지 */}
        <Route path={PATH.HOME} element={<DateRoutePage />} />
        <Route path={PATH.LOGIN} element={<LoginPage />} />
        <Route path={PATH.SIGNUP} element={<SignupPage />} />
        <Route path={PATH.NAVITALK} element={<NaviTalkPage />} />

        {/* 로그인해야 이용할 수 있는 페이지 */}
        <Route
          path={PATH.MYPAGE}
          element={
            <ProtectRoute>
              <MyPage />
            </ProtectRoute>
          }
        />
        <Route
          path={PATH.DATEDETAIL}
          element={
            <ProtectRoute>
              <DateRouteDetail />
            </ProtectRoute>
          }
        />
        <Route
          path={PATH.WRITEPOST}
          element={
            <ProtectRoute>
              <WritePostPage />
            </ProtectRoute>
          }
        />
        <Route
          path={PATH.NAVITALKDETAIL}
          element={
            <ProtectRoute>
              <NaviTalkDetail />
            </ProtectRoute>
          }
        />
        <Route
          path={PATH.DATEWRITE}
          element={
            <ProtectRoute>
              <DateRouteWritePage />
            </ProtectRoute>
          }
        />
        <Route
          path={PATH.PROFILE}
          element={
            <ProtectRoute>
              <ProfilePage />
            </ProtectRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default Router;
