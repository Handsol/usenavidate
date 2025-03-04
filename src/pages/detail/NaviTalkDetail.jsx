import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../supabase/Client';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import UseKakaoLoader from '../../components/UseKakaoLoader';

const NaviTalkDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  //장소 정보 저장
  const [locations, setLocations] = useState([]);
  // 지도 중심 (초기값 설정)
  const [mapCenter, setMapCenter] = useState({ lat: 37.546416, lng: 127.045646 });
  // 지도에 표시할 마커들의 좌표 리스트 저장
  const [markers, setMarkers] = useState([]);

  const reviewStars = () => {
    if (post.posts_review === 1) {
      return '⭐';
    } else if (post.posts_review === 2) {
      return '⭐⭐';
    } else if (post.posts_review === 3) {
      return '⭐⭐⭐';
    } else if (post.posts_review === 4) {
      return '⭐⭐⭐⭐';
    } else if (post.posts_review === 5) {
      return '⭐⭐⭐⭐⭐';
    }
  };

  // 게시글의 이미지 URL을 저장할 배열
  const imageUrls =
    post?.posts_img_url && post.posts_img_url.length > 0 ? [...post.posts_img_url] : ['/navi_talk_default.png'];

  // 이미지가 5개 미만일 시 나타날 default 이미지 추가
  while (imageUrls.length < 5) {
    imageUrls.push('/navi_talk_default.png');
  }

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('posts').select('*').eq('posts_id', id).single();

      if (error) {
        console.error('게시글 불러오기 오류:', error);
        setLoading(false);
        return;
      }
      // 장소 데이터 가져오기 (주소 + 가게이름 포함)
      const { data: locData, error: locError } = await supabase
        .from('posts_locations')
        .select('posts_location_url, posts_location_url_name')
        .eq('posts_id', id);

      if (locError) console.error('장소 불러오기 오류:', locError);
      else {
        setLocations(locData);
        // 첫 번째 장소  지도 중심 설정
        if (locData.length > 0) {
          kakaoAdressMarkers(locData); // 주소를 좌표로 변환하는 함수 호출
        }
      }
      // Kakao API를 사용하여 주소를 좌표로 변환하는 함수
      const kakaoAdressMarkers = (locations) => {
        if (!window.kakao || !window.kakao.maps) {
          console.error('Kakao Maps API가 아직 로드되지 않았습니다.');
          return;
        }
        // Kakao Maps API에서 제공하는 Geocoder 객체 생성
        // 이 객체를 사용하면 특정 주소를 입력받아 해당 위치의 위도(lat)와 경도(lng) 좌표를 반환
        const geocoder = new window.kakao.maps.services.Geocoder();
        const newMarkers = [];
        // 순회하면서 주소 변환
        locations.forEach((loc, index) => {
          geocoder.addressSearch(loc.posts_location_url, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              //
              const lat = parseFloat(result[0].y);
              const lng = parseFloat(result[0].x);

              newMarkers.push({ lat, lng });

              if (index === 0) {
                setMapCenter({ lat, lng });
              }

              setMarkers([...newMarkers]);
            } else {
              console.error(`주소 변환 실패: ${loc.posts_location_url}`);
            }
          });
        });
      };

      // 이미지 불러오기
      const { data: photosData, error: photosError } = await supabase
        .from('posts_photos')
        .select('posts_id, posts_img_url')
        .eq('posts_id', id);

      if (photosError || !photosData) {
        console.error('이미지 불러오기 오류:', photosError);
        return;
      }

      setPost({
        ...data,
        posts_img_url: photosData?.map((photo) => photo.posts_img_url) || []
      });
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex flex-col h-[100vh] max-w-[1000px] mx-auto bg-palette4 gap-4 p-4">
      <p className="flex mt-10 text-2xl font-semibold text-palette1">Location</p>

      <div className="text-2xl font-semibold text-left ">
        {locations.length > 0
          ? locations.map((loc, index) => (
              <div key={index}>
                {loc.posts_location_url_name} - {loc.posts_location_url}
              </div>
            ))
          : '장소 정보 없음'}
      </div>

      {/* 지도 */}
      <div className="flex-1 min-h-[350px] bg-palette3 rounded-3xl overflow-hidden">
        <UseKakaoLoader />
        <Map id="map" center={mapCenter} className="w-full h-full" level={3}>
          {markers.map((marker, index) => (
            <MapMarker key={index} position={marker} />
          ))}
        </Map>
      </div>
      {/* 사진 첨부 */}
      <div className="flex flex-row w-full h-[170px] justify-between">
        {imageUrls.slice(0, 5).map((img, index) => (
          <div key={index} className="flex w-[150px] h-[150px] rounded-3xl">
            <img src={img} alt="이미지" className="w-full h-full object-cover rounded-3xl" />
          </div>
        ))}
      </div>
      {/* 장소 설명 */}
      <section className="flex flex-col gap-5">
        <div className="flex flex-row justify-between gap-2">
          <div className="flex flex-col w-[75%] gap-1">
            <p className="flex text-xl font-semibold text-palette1 pl-3">상호명</p>
            <div className="flex w-full h-[60px] border-4 border-palette5 text-2xl items-center rounded-3xl pl-5">
              {post.posts_title}
            </div>
          </div>
          <div className="flex flex-col w-[20%] gap-1">
            <p className="flex text-xl font-semibold text-palette1 pl-3">별점</p>
            <div className="flex w-full h-[60px] border-4 border-palette5 text-2xl justify-center items-center rounded-3xl">
              {reviewStars()}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-1">
          <p className="flex text-xl font-semibold text-palette1 pl-3">태그</p>
          <div className="flex w-full h-[60px] border-4 border-palette5 text-2xl items-center rounded-3xl pl-5">
            {(typeof post.posts_tags === 'string' ? post.posts_tags.split(',') : post.posts_tags || []).map(
              (tag, index) => (
                <p key={index}>#{tag}</p>
              )
            )}
          </div>
        </div>
        <div className="flex flex-col w-full gap-1">
          <p className="flex text-xl font-semibold text-palette1 pl-3">상세 설명</p>
          <div className="flex w-full h-[200px] border-4 border-palette5 text-2xl rounded-3xl p-5">
            {post.posts_info}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NaviTalkDetail;
