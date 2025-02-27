// DateRoutePage.jsx
import { Map } from 'react-kakao-maps-sdk';
// 작성했던 Kakao 스크립트 로더 컴포넌트 import
import UseKakaoLoader from '../components/UseKakaoLoader';

const DateRouteWritePage = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute  left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-[60%] w-full max-w-4xl">
        <UseKakaoLoader />
        <Map id="map" center={{ lat: 37.546416, lng: 127.045646 }} className="w-full h-[450px] rounded-xl" level={4} />
      </div>
    </div>
  );
};

export default DateRouteWritePage;
