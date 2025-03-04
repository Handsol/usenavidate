import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import UseKakaoLoader from '../components/UseKakaoLoader';
import { AlertError, AlertSuccess } from '../common/Alert';
import supabase from '../supabase/Client';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import useSelectFilters, { ageGroups, relations, locations, costOptions } from '../data/categoryData';
import { Fragment } from 'react';

const DateRouteWritePage = () => {
  // useSelectFilters 훅을 사용하여 필터 상태 및 업데이트 함수를 가져옴
  const {
    selectedAgeGroup,
    setSelectedAgeGroup,
    selectedRelation,
    setSelectedRelation,
    selectedLocation,
    setSelectedLocation,
    selectedCost,
    setSelectedCost
  } = useSelectFilters();

  // 지도에 표시할 마커(선택한 장소)들을 저장하는 상태
  const [markers, setMarkers] = useState([]);
  // 지도 인스턴스를 저장하여 이후에 지도 제어(예: panTo)할 때 사용
  const [mapInstance, setMapInstance] = useState(null);
  // 검색창에 입력한 주소 문자열을 저장하는 상태
  const [searchQuery, setSearchQuery] = useState('');
  // Kakao Maps SDK가 로드되었는지 여부를 저장하는 상태
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);
  // 사용자가 선택한 장소 목록을 저장하는 상태
  const [places, setPlaces] = useState([]);
  // 데이트 코스 제목을 저장하는 상태
  const [dateTitle, setDateTitle] = useState('');
  // 데이트 코스 설명을 저장하는 상태
  const [description, setDescription] = useState('');
  // 주소 검색 결과 목록을 저장하는 상태
  const [searchResults, setSearchResults] = useState([]);

  // Kakao Maps SDK가 로드되었는지 체크하는 함수
  const checkKakaoLoaded = () => {
    // window.kakao와 window.kakao.maps 객체가 존재하면 SDK가 로드된 상태
    if (window.kakao && window.kakao.maps) {
      setIsKakaoLoaded(true);
    } else {
      // 존재하지 않으면 100ms 후에 다시 체크
      setTimeout(checkKakaoLoaded, 100);
    }
  };

  // 컴포넌트가 마운트될 때 Kakao Maps SDK의 로드를 확인하기 위해 checkKakaoLoaded 호출
  useEffect(() => {
    checkKakaoLoaded();
  }, []);

  // 지도 컴포넌트가 생성되면 호출되어 지도 인스턴스를 저장
  const onCreateMap = (map) => {
    setMapInstance(map);
  };

  // 선택된 장소를 삭제 해당 인덱스의 장소를 목록과 마커 리스트에서 제거
  const handleDeleteAddrList = (indexToDelete) => {
    // 주소 삭제하기
    setPlaces((prev) => prev.filter((_, i) => i !== indexToDelete));
    // 마커 삭제하기
    setMarkers((prev) => prev.filter((_, i) => i !== indexToDelete));
  };

  // Supabase에 데이터를 저장
  const handleSubmit = async () => {
    // 입력값 검증
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
      // 현재 로그인한 사용자 ID를 가져옴
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();
      if (userError || !user) {
        AlertError('로그인된 사용자를 찾을 수 없습니다.');
        return;
      }
      const userId = user.id;
      //posts 테이블에 데이터 저장
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .insert([
          {
            posts_title: dateTitle,
            posts_info: description,
            posts_review: 0,
            users_id: userId,
            posts_value: selectedCost.name,
            board_type: 'dateroute'
          }
        ])
        .select('posts_id')
        .eq('board_type', 'dateroute')
        .single();

      if (postError) throw postError;

      const postId = postData?.posts_id;
      if (!postId) {
        AlertError('게시글 ID를 찾을 수 없습니다.');
        return;
      }
      // post_tag 테이블에 데이터 저장
      const selectedTags = [
        selectedAgeGroup.name, // 예: "10대"
        selectedRelation.name, // 예: "부부"
        selectedLocation.name // 예 : "서울"
      ];
      const tagData = selectedTags.map((tag) => ({
        posts_id: postId,
        tag_name: tag
      }));

      const { error: tagError } = await supabase.from('posts_tag').insert(tagData);
      if (tagError) throw tagError;
      //posts_locations 테이블에 장소 데이터 저장
      const locationData = places.map((place) => ({
        posts_id: postId,
        posts_location_url: place.address
      }));

      const { error: locError } = await supabase.from('posts_locations').insert(locationData);
      if (locError) throw locError;

      AlertSuccess('게시글이 성공적으로 등록되었습니다!');
    } catch (error) {
      AlertError(`등록 실패: ${error.message}`);
    }
  };

  // Kakao Places API를 사용하여 키워드로 장소 검색
  const handleSearchPlace = () => {
    if (!isKakaoLoaded) {
      AlertError('Kakao Maps API가 아직 로드되지 않았습니다.');
      return;
    }

    // Places 서비스 객체 생성
    const ps = new window.kakao.maps.services.Places();
    // 키워드 검색 메서드 호출: 검색 결과를 콜백으로 받음
    ps.keywordSearch(searchQuery, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setSearchResults(data); // 검색 결과가 성공하면 상태 업데이트
      } else {
        AlertError('검색 결과를 찾을 수 없습니다.');
        setSearchResults([]); // 실패 시 빈 배열로 초기화
      }
    });
  };

  // 검색 결과에서 사용자가 선택한 장소를 지도에 추가
  const handleSelectPlace = (place) => {
    const lat = parseFloat(place.y); // 위도 변환
    const lng = parseFloat(place.x); // 경도 변환

    const newPlace = {
      lat,
      lng,
      address: place.road_address_name || place.address_name, // 도로명 주소 우선, 없으면 일반 주소 사용
      name: place.place_name
    };

    // 지도 인스턴스가 있으면 해당 좌표로 지도 중심 이동
    if (mapInstance) {
      mapInstance.panTo(new window.kakao.maps.LatLng(lat, lng));
    }

    // 마커와 선택된 장소 목록 업데이트
    setMarkers((prev) => [...prev, newPlace]);
    setPlaces((prev) => [...prev, newPlace]);
    setSearchResults([]); // 검색 결과 초기화
    setSearchQuery(''); // 검색창 초기화

    // 모든 마커가 보이도록 지도 영역 자동 조정
    if (mapInstance) {
      const bounds = new window.kakao.maps.LatLngBounds();
      [...markers, newPlace].forEach((marker) => {
        bounds.extend(new window.kakao.maps.LatLng(marker.lat, marker.lng));
      });
      mapInstance.setBounds(bounds);
    }
  };

  return (
    <div className="w-full h-screen flex overflow-hidden">
      <div className="w-1/3 p-6 overflow-auto flex flex-col items-center">
        <UseKakaoLoader />
        {/* 제목 및 검색 입력창 */}
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
            placeholder="가게명, 지명을 입력하세요"
            className="border p-3 w-full text-center rounded-lg cursor-pointer"
            onKeyDown={(e) => e.key === 'Enter' && handleSearchPlace()}
          />
        </div>
        {/* 검색 결과 리스트 */}
        {searchResults.length > 0 && (
          <div className="w-full max-w-sm bg-white border rounded-lg shadow-lg mt-2">
            {searchResults.map((place, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelectPlace(place)}
              >
                {place.place_name} - {place.road_address_name || place.address_name}
              </div>
            ))}
          </div>
        )}
        {/* 선택된 장소 목록 */}
        <div className="mt-6 w-full max-w-sm">
          {places.length === 0 ? (
            <p>선택된 장소가 없습니다.</p>
          ) : (
            places.map((place, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-palette5 border border-palette2 p-3 mt-2 rounded-lg"
              >
                <span>{place.name}</span>
                <button onClick={() => handleDeleteAddrList(index)} className="text-palette8 text-lg">
                  삭제
                </button>
              </div>
            ))
          )}
        </div>
        {/* Headlessui 사용 CustomSelect 컴포넌트 사용 */}
        <div className="flex flex-col">
          <span className="text-palette2 font-bold text-[20px]">태그</span>{' '}
          <div className="w-full pt-2 flex flex-row gap-5 justify-center">
            <div className="w-40">
              <Listbox value={selectedAgeGroup} onChange={setSelectedAgeGroup}>
                <div className="relative">
                  <ListboxButton className="relative w-full border-4 border-palette5 font-bold rounded-lg bg-inherit py-2 pl-3 pr-10 text-left text-palette2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition">
                    {selectedAgeGroup.name}
                  </ListboxButton>
                  <Transition
                    as={Fragment}
                    enter="transition-all duration-1000 ease-in-out"
                    enterFrom="max-h-0 opacity-0"
                    enterTo="max-h-96 opacity-100"
                    leave="transition-all duration-1000 ease-in-out"
                    leaveFrom="max-h-96 opacity-100"
                    leaveTo="max-h-0 opacity-0"
                  >
                    <ListboxOptions className="absolute mt-2 w-full overflow-hidden rounded-lg bg-palette5 text-gray-600 shadow-lg">
                      {ageGroups.map((option, index) => (
                        <ListboxOption
                          key={index}
                          value={option}
                          className="cursor-pointer select-none py-2 pl-3 pr-10 hover:bg-gray-400 hover:text-palette5 transition flex items-center justify-between"
                        >
                          {option.name}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Transition>
                </div>
              </Listbox>
            </div>
            <div className="w-40">
              <Listbox value={selectedRelation} onChange={setSelectedRelation}>
                <div className="relative">
                  <ListboxButton className="relative w-full border-4 border-palette5 font-bold rounded-lg bg-inherit py-2 pl-3 pr-10 text-left text-palette2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition">
                    {selectedRelation.name}
                  </ListboxButton>
                  <Transition
                    as={Fragment}
                    enter="transition-all duration-1000 ease-in-out"
                    enterFrom="max-h-0 opacity-0"
                    enterTo="max-h-96 opacity-100"
                    leave="transition-all duration-1000 ease-in-out"
                    leaveFrom="max-h-96 opacity-100"
                    leaveTo="max-h-0 opacity-0"
                  >
                    <ListboxOptions className="absolute mt-2 w-full overflow-hidden rounded-lg bg-palette5 text-gray-600 shadow-lg">
                      {relations.map((option, index) => (
                        <ListboxOption
                          key={index}
                          value={option}
                          className="cursor-pointer select-none py-2 pl-3 pr-10 hover:bg-gray-400 hover:text-palette5 transition flex items-center justify-between"
                        >
                          {option.name}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Transition>
                </div>
              </Listbox>
            </div>
            <div className="w-40">
              <Listbox value={selectedLocation} onChange={setSelectedLocation}>
                <div className="relative">
                  <ListboxButton className="relative w-full border-4 border-palette5 font-bold rounded-lg bg-inherit py-2 pl-3 pr-10 text-left text-palette2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition">
                    {selectedLocation.name}
                  </ListboxButton>
                  <Transition
                    as={Fragment}
                    enter="transition-all duration-1000 ease-in-out"
                    enterFrom="max-h-0 opacity-0"
                    enterTo="max-h-96 opacity-100"
                    leave="transition-all duration-1000 ease-in-out"
                    leaveFrom="max-h-96 opacity-100"
                    leaveTo="max-h-0 opacity-0"
                  >
                    <ListboxOptions className="absolute mt-2 w-full overflow-hidden rounded-lg bg-palette5 text-gray-600 shadow-lg">
                      {locations.map((option, index) => (
                        <ListboxOption
                          key={index}
                          value={option}
                          className="cursor-pointer select-none py-2 pl-3 pr-10 hover:bg-gray-400 hover:text-palette5 transition flex items-center justify-between"
                        >
                          {option.name}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Transition>
                </div>
              </Listbox>
            </div>
            <div className="w-40">
              <Listbox value={selectedCost} onChange={setSelectedCost}>
                <div className="relative">
                  <ListboxButton className="relative w-full border-4 border-palette5 font-bold rounded-lg bg-inherit py-2 pl-3 pr-10 text-left text-palette2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition">
                    {selectedCost.name}
                  </ListboxButton>
                  <Transition
                    as={Fragment}
                    enter="transition-all duration-1000 ease-in-out"
                    enterFrom="max-h-0 opacity-0"
                    enterTo="max-h-96 opacity-100"
                    leave="transition-all duration-1000 ease-in-out"
                    leaveFrom="max-h-96 opacity-100"
                    leaveTo="max-h-0 opacity-0"
                  >
                    <ListboxOptions className="absolute mt-2 w-full overflow-hidden rounded-lg bg-palette5 text-gray-600 shadow-lg">
                      {costOptions.map((option, index) => (
                        <ListboxOption
                          key={index}
                          value={option}
                          className="cursor-pointer select-none py-2 pl-3 pr-10 hover:bg-gray-400 hover:text-palette5 transition flex items-center justify-between"
                        >
                          {option.name}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
        </div>

        {/* 데이트 코스 설명 입력창 */}
        <textarea
          className="border w-4/5 p-2 mt-4 resize-none"
          rows="4"
          placeholder="데이트 코스 설명을 입력하세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* 등록 버튼 */}
        <button
          onClick={() => handleSubmit()}
          className="p-3 mt-10 bg-palette1 text-palette5 w-2/3 rounded-lg hover:bg-palette2 transition"
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
