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
  // 선택한 장소 목록
  const [places, setPlaces] = useState([]);
  // 데이트 코스 제목
  const [dateTitle, setDateTitle] = useState('');
  // 데이트 코스 설명 상태
  const [description, setDescription] = useState('');

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
  // 주소 목록 지우기 핸들러
  const handleDeleteAddrList = (indexToDelete) => {
    setPlaces((prev) => prev.filter((_, i) => i !== indexToDelete));
  };
  // 주소 검색 버튼, 입력창 클릭하면 호출
  const handleSearchAddr = () => {
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
            const currentPos = { lat, lng, address: addrData.address };
            // 지도 인스턴스가 있다면, panTo 메서드로 해당 좌표로 지도 중심 이동
            if (mapInstance) {
              mapInstance.panTo(new window.kakao.maps.LatLng(lat, lng));
            }
            // 변환된 좌표에 마커 추가
            setMarkers((prev) => [...prev, currentPos]);
            // 주소 값 받아오기
            setPlaces((prev) => [...prev, currentPos]);
            // 검색된 주소를 입력창에 표시
            setSearchQuery('');
          } else {
            alert('주소를 찾을 수 없습니다.');
          }
        });
      }
    }).open(); // 주소 검색 팝업 열기
  };
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/3 p-4">
        <UseKakaoLoader />
        <div className="mb-4 flex items-center">
          <input
            type="text"
            value={searchQuery}
            placeholder="주소를 입력해주세요."
            className="border p-2 w-64 cursor-pointer "
            onClick={handleSearchAddr}
          />
        </div>
        {/* 선택한 장소 목록 보여주기 */}
        <div className="mt-4 h-full overflow-y-auto">
          {places.length === 0 ? (
            <p>선택된 장소가 없습니다.</p>
          ) : (
            places.map((place, index) => (
              <div key={index} className="flex justify-between items-center border border-palette2 p-3 mt-2 rounded-lg">
                <span>{place.address}</span>
                <button onClick={() => handleDeleteAddrList(index)} className="text-palette8 text-lg">
                  삭제
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="w-2/3 h-full">
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
    </div>
  );
};
export default DateRouteWritePage;
