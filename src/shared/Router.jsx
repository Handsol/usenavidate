import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

const Router = () => {
  return (
    <BrowserRouter>
      {/* Header 컴포넌트 전역 적용 */}
      <Header />
      {/* Header 높이만큼 여백 주기 */}
      <div className="pt-20">
        <Routes>
          <Route path={PATH.HOME} element={<DateRoutePage />} />
          <Route path={PATH.LOGIN} element={<LoginPage />} />
          <Route path={PATH.SIGNUP} element={<SignupPage />} />
          <Route path={PATH.MYPAGE} element={<MyPage />} />
          <Route path={PATH.DATEDETAIL} element={<DateRouteDetail />} />
          <Route path={PATH.WRITEPOST} element={<WritePostPage />} />
          <Route path={PATH.NAVITALK} element={<NaviTalkPage />} />
          <Route path={PATH.NAVITALKDETAIL} element={<NaviTalkDetail />} />
          <Route path={PATH.DATEWRITE} element={<DateRouteWritePage />} />
          <Route path={PATH.PROFILE} element={<ProfilePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
