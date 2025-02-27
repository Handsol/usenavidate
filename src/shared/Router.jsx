import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import MyPage from '../pages/MyPage';
import DateRoutePage from '../pages/DateRoutePage';
import DateRouteDetail from '../pages/detail/DateRouteDetail';
import WritePostPage from '../pages/WritePostPage';
import NaviTalkPage from '../pages/NaviTalkPage';
import NaviTalkDetail from '../pages/detail/NaviTalkDetail';
import Header from '../components/layout/Header';

const Router = () => {
  return (
    <BrowserRouter>
      {/* Header 컴포넌트 전역 적용 */}
      <Header />
      {/* Header 높이만큼 여백 주기 */}
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<DateRoutePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/datedetail" element={<DateRouteDetail />} />
          <Route path="/writepost" element={<WritePostPage />} />
          <Route path="/navitalk" element={<NaviTalkPage />} />
          <Route path="/navitalkdetail" element={<NaviTalkDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
