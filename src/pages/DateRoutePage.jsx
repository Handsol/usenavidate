// DateRoutePage.jsx
import { Map } from 'react-kakao-maps-sdk';
// 작성했던 Kakao 스크립트 로더 컴포넌트 import
import UseKakaoLoader from '../components/UseKakaoLoader';

const DateRoutePage = () => {
  return (
    <div>
      {/* Kakao Maps SDK 스크립트를 로드하는 컴포넌트 렌더링
      먼저 마운트되서 스크립트가 로드되면 이후에 아래 Map 컴포넌트 작동 */}
      <UseKakaoLoader />
      <Map id="map" center={{ lat: 33.450701, lng: 126.570667 }} style={{ width: '100%', height: '450px' }} level={3} />
    </div>
    // center는 지도 중심 좌표, stlye은 지도 크기 지정, level은 지도 확대 레벨입니다.(숫자가 적을 수록 확대)
  );
};

export default DateRoutePage;
