import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

export default function useKakaoLoader() {
  // import.meta.env를 통해 환경변수(VITE_KAKAOMAP_KEY)에 접근
  const appkey = import.meta.env.VITE_KAKAOMAP_KEY;

  // 훅을 사용해서 kakao Maps 스크립트 로드하기
  useKakaoLoaderOrigin({
    appkey: appkey, // 환경변수로 관리하는 Kakao API 키 사용
    libraries: ['clusterer', 'drawing', 'services']
    // 추가로 로드할 kakao Maps 라이브러리들
  });
}
