import { useParams } from 'react-router-dom';
import PostEditDropDown from '../../components/PostEditDropdown';
import useFetchPostDetail from '../../hooks/useFetchPostDetail';

const NaviTalkDetail = () => {
  const { id } = useParams();
  const { post, loading, updatePost, deletePost } = useFetchPostDetail(id);

  const reviewStars = () => {
    if (!post) return '';
    return '⭐'.repeat(post.posts_review);
  };

  // 게시글의 이미지 URL을 저장할 배열
  const imageUrls = post?.posts_img_url?.length > 0 ? [...post.posts_img_url] : ['/navi_talk_default.png'];

  // 이미지가 5개 미만일 경우 default 이미지 추가
  while (imageUrls.length < 5) {
    imageUrls.push('/navi_talk_default.png');
  }

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex flex-col h-[100vh] max-w-[1000px] mx-auto bg-palette4 gap-4">
      <div className="flex flex-row w-full justify-between items-center mt-5">
        <div className="flex flex-col justify-start">
          <p className="flex w-full text-2xl font-semibold text-palette1">Location</p>
          <p>여기는 주소 어쩌구저쩌구 막 길쭉하게 스근하게 스르륵</p>
        </div>
        <PostEditDropDown post={post} updatePost={updatePost} deletePost={deletePost} className="flex w-[50px]" />
      </div>

      {/* 지도 */}
      <div className="flex flex-col">
        <p className="flex text-2xl font-semibold text-center">{post.posts_location}</p>
        <div className="flex w-full h-[350px] justify-center items-center bg-palette3 rounded-3xl">여기는 지도</div>
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
