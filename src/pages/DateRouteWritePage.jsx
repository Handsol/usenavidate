import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import UseKakaoLoader from '../components/UseKakaoLoader';
import { AlertError } from '../common/Alert';
import supabase from '../supabase/Client';

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
    // 주소 삭제하기
    setPlaces((prev) => prev.filter((_, i) => i !== indexToDelete));
    // 마커 삭제하기
    setMarkers((prev) => prev.filter((_, i) => i !== indexToDelete));
  };
  // supabase에 데이터 저장하기 submit
  const handleSubmit = async () => {
    if (!dateTitle.trim()) {
      AlertError('제목을 입력해주세요');
      return;
    }
    if (!description.trim()) {
      AlertError('코스의 설명이 필요합니다');
      return;
    }
    if (places.length === 0) {
      AlertError('1개 이상의 장소를 선택해주세요');
      return;
    }

    try {
      //posts 테이블에 데이터 저장
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .insert([
          {
            posts_title: dateTitle,
            posts_info: description,
            posts_review: 0,
            users_id: '25ec2e69-6f73-41e5-acde-d12dfc1e835d', // 테스트용 user_id
            posts_tags: '' // 필요하면 태그 추가
          }
        ])
        .select('posts_id') // posts_id 값 반환받기
        .single();

      if (postError) throw postError;

      const postId = postData?.posts_id;
      if (!postId) {
        AlertError('게시글 ID를 찾을 수 없습니다.');
        return;
      }

      // posts_locations 테이블에 장소 정보 저장
      const locationData = places.map((place) => ({
        posts_id: postId,
        posts_location_url: place.address // 주소를 posts_location_url 컬럼에 저장
      }));

      const { error: locError } = await supabase.from('posts_locations').insert(locationData);
      if (locError) throw locError;

      alert('게시글이 성공적으로 등록되었습니다!');
    } catch (error) {
      AlertError(`등록 실패: ${error.message}`);
    }
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
            // 새로운 주소 값이 입력될 때마다 모든 마커가 보이도록 자동 조정
            if (mapInstance) {
              const bounds = new window.kakao.maps.LatLngBounds();
              [...markers, currentPos].forEach((marker) => {
                bounds.extend(new window.kakao.maps.LatLng(marker.lat, marker.lng));
              });

              //모든 마커가 보이도록 자동 조정
              mapInstance.setBounds(bounds);
            }

            setSearchQuery('');
          } else {
            alert('주소를 찾을 수 없습니다.');
          }
        });
      }
    }).open(); // 주소 검색 팝업 열기
  };
  return (
    <div className="w-full h-screen flex overflow-hidden">
      <div className="w-1/3 p-6 overflow-auto flex flex-col items-center">
        <UseKakaoLoader />
        {/* 제목 입력 */}
        <div className="w-full max-w-sm flex flex-col items-center gap-2">
          <input
            type="text"
            value={dateTitle}
            onChange={(e) => setDateTitle(e.target.value)}
            placeholder="제목을 입력해주세요."
            className="border p-3 w-full text-center rounded-lg"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="주소를 입력해주세요."
            className="border p-3 w-full text-center rounded-lg cursor-pointer"
            onClick={handleSearchAddr}
          />
        </div>
        {/* 선택한 장소 목록 보여주기 */}
        <div className="mt-6 w-full max-w-sm">
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
        {/* 코스 설명 */}
        <textarea
          className="border w-3/4 p-2 mt-4"
          rows="4"
          placeholder="데이트 코스 설명을 입력하세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* 등록 버튼 */}
        <button
          onClick={() => handleSubmit()}
          className="p-3 bg-palette1 text-palette5 w-full rounded-lg hover:bg-palette2 transition"
        >
          등록하기
        </button>
      </div>
      <div className="w-2/3 h-full">
        {/* 지도 출력 */}
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
