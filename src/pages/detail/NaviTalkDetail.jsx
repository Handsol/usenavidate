import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../supabase/Client';

const NaviTalkDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

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

      setPost(data);
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
    <div className="flex flex-col h-[100vh] max-w-[1000px] mx-auto bg-palette4 gap-6">
      <p className="flex mt-10 text-2xl font-semibold text-palette1">Location</p>
      {/* 지도 */}
      <div className="flex flex-col gap-5">
        <p className="flex text-2xl font-semibold text-center">{post.posts_location}</p>
        <div className="flex w-full h-[450px] justify-center items-center bg-palette3 rounded-3xl">여기는 지도</div>
      </div>
      {/* 사진 첨부 */}
      <div className="flex flex-row w-full h-[170px] justify-between">
        {imageUrls.slice(0, 5).map((img, index) => (
          <div key={index} className="flex w-[170px] h-[170px] bg-gray-400 rounded-3xl">
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
            태그
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
