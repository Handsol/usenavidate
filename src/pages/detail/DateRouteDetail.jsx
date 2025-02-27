// DateRoutePage.jsx
import { Map } from 'react-kakao-maps-sdk';
// 작성했던 Kakao 스크립트 로더 컴포넌트 import
import UseKakaoLoader from '../../components/UseKakaoLoader';

const DateRouteDetail = () => {
  return (
    <div className="w-full h-[600px]">
      <UseKakaoLoader />
      <Map id="map" center={{ lat: 33.450701, lng: 126.570667 }} className="w-full h-full" level={3} />
    </div>
  );
};

export default DateRouteDetail;
