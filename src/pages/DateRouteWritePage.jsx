import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import UseKakaoLoader from '../components/UseKakaoLoader';

const DateRouteWritePage = () => {
  // 지도에 표시할 마커들의 좌표를 저장하는 상태
  const [markers, setMarkers] = useState([]);
  // 생성된 지도 인스턴스를 저장하는 상태
  const [mapInstance, setMapInstance] = useState(null);
  // 검색된 주소 문자열 저장
  const [searchQuery, setSearchQuery] = useState('');
  // Kakao Maps SDK가 로드되었는지 여부 확인
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

  const checkKakaoLoaded = () => {
    // window.kakao와 그 안의 maps가 존재하는지 확인
    if (window.kakao && window.kakao.maps) {
      setIsKakaoLoaded(true);
    } else {
      // 안에 객체가 없다면 100ms 후에 다시 체크
      setTimeout(checkKakaoLoaded, 100);
    }
  };
  // 컴포넌트 마운트 후에 Kakao Maps SDK가 로드되었는지 확인
  useEffect(() => {
    checkKakaoLoaded();
  }, []);

  // Map 컴포넌트 생성되면 호출, 지도 인스턴스 저장
  const onCreateMap = (map) => {
    setMapInstance(map);
  };

  // 주소 검색 버튼, 입력창 클릭하면 호출
  const onClickAddr = () => {
    if (!isKakaoLoaded) {
      alert('Kakao Maps API가 아직 로드되지 않았습니다.');
      return;
    }
    // Daum postcode 주소 검색 팝업 생성 후 오픈
    new window.daum.Postcode({
      oncomplete: function (addrData) {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(addrData.address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const lat = parseFloat(result[0].y); // 위도
            const lng = parseFloat(result[0].x); // 경도
            const currentPos = { lat, lng };
            // 지도 인스턴스가 있다면, panTo 메서드로 해당 좌표로 지도 중심 이동
            if (mapInstance) {
              mapInstance.panTo(new window.kakao.maps.LatLng(lat, lng));
            }
            // 변환된 좌표에 마커 추가
            setMarkers((prev) => [...prev, currentPos]);
            // 검색된 주소를 입력창에 표시
            setSearchQuery(addrData.address);
          } else {
            alert('주소를 찾을 수 없습니다.');
          }
        });
      }
    }).open(); // 주소 검색 팝업 열기
  };
  return (
    <div className="w-3/4 h-screen flex justify-center items-center ">
      <UseKakaoLoader />
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={searchQuery}
          readOnly
          placeholder="검색된 주소가 여기에 표시됩니다."
          className="border p-2 w-64 cursor-pointer"
          onClick={onClickAddr}
        />
        <button onClick={onClickAddr} className="ml-2 p-2 bg-blue-500 text-white">
          주소 검색
        </button>
      </div>
      <Map
        id="map"
        center={{ lat: 33.450701, lng: 126.570667 }}
        className="w-full h-full"
        level={3}
        onCreate={onCreateMap}
      >
        {markers.map((marker, index) => (
          <MapMarker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
      </Map>
    </div>
  );
};
export default DateRouteWritePage;
