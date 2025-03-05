import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../../supabase/Client';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import UseKakaoLoader from '../../components/UseKakaoLoader';
import PostEditDropDown from '../../components/PostEditDropdown';
import { AlertSuccess } from '../../common/Alert';

const DateRouteDetail = () => {
  // 현재 URL에서 id값 가져오기 (게시물 불러오기)
  const { id } = useParams();
  // 게시글 정보 저장
  const [post, setPost] = useState(null);
  // 데이터 로딩 상태
  const [loading, setLoading] = useState(true);
  //장소 정보 저장
  const [locations, setLocations] = useState([]);
  // 게시글 이미지 저장
  const [imageUrls, setImageUrls] = useState([]);
  // 게시글 태그 저장
  const [tags, setTags] = useState([]);
  // 지도 중심 (초기값 설정)
  const [mapCenter, setMapCenter] = useState({ lat: 37.546416, lng: 127.045646 });
  // 지도에 표시할 마커들의 좌표 리스트 저장
  const [markers, setMarkers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetail = async () => {
      setLoading(true); // 데이터 불러오는 동안 로딩 상태 true

      // 게시글 데이터 가져오기
      const { data: postData, error: postError } = await supabase.from('posts').select('*').eq('posts_id', id).single();

      if (postError) {
        console.error('게시글 불러오기 오류:', postError);
        setLoading(false); // 오류 발생 시 로딩 종료
        return;
      }
      setPost(postData); // 가져온 게시글 저장하기

      // 이미지 가져오기
      const { data: photosData, error: photosError } = await supabase
        .from('posts_photos')
        .select('posts_img_url')
        .eq('posts_id', id);

      if (photosError) console.error('사진 불러오기 오류:', photosError);
      let imgs = photosData ? photosData.map((photo) => photo.posts_img_url) : [];
      while (imgs.length < 5) imgs.push('/navi_talk_default.png');
      setImageUrls(imgs);

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

      // 태그 데이터 가져오기
      const { data: tagData, error: tagError } = await supabase.from('posts_tag').select('tag_name').eq('posts_id', id);

      if (tagError) console.error('태그 불러오기 오류:', tagError);
      else setTags(tagData.map((tag) => tag.tag_name));

      setLoading(false);
    };

    fetchPostDetail();
  }, [id]);

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
  // 게시글 삭제 함수
  const deletePost = async () => {
    // posts, posts_photos, posts_locations, posts_tag 등 연관된 데이터 삭제 필요시 추가 구현 가능
    const { error } = await supabase.from('posts').delete().eq('posts_id', id);
    if (error) {
      console.error('게시글 삭제 오류:', error);
      AlertError('게시글 삭제에 실패했습니다.');
    } else {
      AlertSuccess('게시글이 삭제되었습니다.');
      navigate('/'); // 삭제 후 홈이나 목록 페이지로 이동
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (!post) return <div>게시물을 찾을 수 없습니다.</div>;

  return (
    <div className="flex flex-col h-[100vh] max-w-[1000px] mx-auto bg-palette4 gap-4 p-4">
      <div className="flex justify-end items-center ">
        <PostEditDropDown post={post} deletePost={deletePost} />
      </div>
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

      {/* 사진 */}
      <div className="flex flex-row w-full h-[170px] justify-between">
        {imageUrls.slice(0, 5).map((img, index) => (
          <div key={index} className="w-[150px] h-[150px] rounded-3xl overflow-hidden">
            <img src={img} alt="이미지" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* 게시글 정보 */}
      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold text-palette1 pl-3">상호명</p>
          <div className="w-full h-[60px] border-4 border-palette5 text-2xl flex items-center rounded-3xl pl-5">
            {post.posts_title}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold text-palette1 pl-3">태그</p>
          <div className="w-full h-[60px] border-4 border-palette5 text-2xl flex items-center rounded-3xl pl-5">
            {tags.map((tag, index) => (
              <span key={index} className="mr-2">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold text-palette1 pl-3">상세 설명</p>
          <div className="w-full h-[200px] border-4 border-palette5 text-2xl rounded-3xl p-5">{post.posts_info}</div>
        </div>
      </section>
    </div>
  );
};

export default DateRouteDetail;
