import { useEffect, useState } from 'react';
import supabase from '../supabase/Client';
import { useNavigate } from 'react-router-dom';

const useFetchPostDetail = (postId) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  //장소 정보 저장
  const [locations, setLocations] = useState([]);
  // 지도 중심 (초기값 설정)
  const [mapCenter, setMapCenter] = useState({ lat: 37.546416, lng: 127.045646 });
  // 지도에 표시할 마커들의 좌표 리스트 저장
  const [markers, setMarkers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // postId가 없으면 실행되지 않음
    if (!postId) return;

    // 먼저 kakaoAdressMarkers 함수를 선언
    const kakaoAdressMarkers = async (locations) => {
      if (!window.kakao || !window.kakao.maps) {
        console.error('Kakao Maps API가 아직 로드되지 않았습니다.');
        return;
      }
      const geocoder = new window.kakao.maps.services.Geocoder();
      const newMarkers = [];

      await Promise.all(
        locations.map(
          (loc, index) =>
            new Promise((resolve) => {
              geocoder.addressSearch(loc.posts_location_url, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  const lat = parseFloat(result[0].y);
                  const lng = parseFloat(result[0].x);
                  newMarkers.push({ lat, lng });

                  if (index === 0) {
                    setMapCenter({ lat, lng });
                  }
                } else {
                  console.error(`주소 변환 실패: ${loc.posts_location_url}`);
                }
                resolve();
              });
            })
        )
      );
      setMarkers(newMarkers);
    };

    const fetchPost = async () => {
      setLoading(true);

      // 게시글 데이터 가져오기
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('*')
        .eq('posts_id', postId)
        .single();

      if (postError || !postData) {
        console.error('게시글 불러오기 오류:', postError);
        setLoading(false);
        return;
      }

      // 이미지 가져오기
      const { data: photosData, error: photosError } = await supabase
        .from('posts_photos')
        .select('posts_id, posts_img_url')
        .eq('posts_id', postId);

      if (photosError) {
        console.error('이미지 불러오기 오류:', photosError);
      }

      // 장소 데이터 가져오기 (주소 + 가게이름)
      const { data: locData, error: locError } = await supabase
        .from('posts_locations')
        .select('posts_location_url, posts_location_url_name')
        .eq('posts_id', postId);

      if (locError) {
        console.error('장소 불러오기 오류:', locError);
      } else {
        setLocations(locData);
        // 첫 번째 장소  지도 중심 설정
        if (locData.length > 0) {
          kakaoAdressMarkers(locData); // 주소를 좌표로 변환하는 함수 호출
        }
      }

      // 최종 데이터 정리
      setPost({
        ...postData,
        posts_img_url: photosData ? photosData.map((photo) => photo.posts_img_url) : []
      });

      setLoading(false);
    };

    fetchPost();
  }, [postId]);

  // 게시글 수정 로직 - 시간이 모자라서 구현 실패...
  // const updatePost = async (updatedData) => {
  // const { data, error } = await supabase.from('posts').update(updatedData).eq('posts_id', postId).select();

  // if (error) {
  //   console.error('게시글 수정 오류', error);
  //   return false;
  // }

  // if (data && data.length > 0) {
  //   setPost(data[0]);
  // }

  // return true;
  // };

  // 게시글 삭제 로직
  const deletePost = async () => {
    const { error } = await supabase.from('posts').delete().eq('posts_id', postId);

    if (error) {
      console.error('게시글 삭제 오류', error);
      return false;
    }

    navigate(-1);
    return true;
  };

  return { post, loading, deletePost, locations, mapCenter, markers };
};

export default useFetchPostDetail;
