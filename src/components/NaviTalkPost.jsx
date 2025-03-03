import { useNavigate } from 'react-router-dom';

const NaviTalkPost = ({ post }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/navitalk/${post.posts_id}`);
  };

  return (
    <div onClick={onClick} className="relative h-[250px] rounded-3xl overflow-hidden cursor-pointer">
      <img className="absolute inset-0 w-full h-full object-cover items-center" src={post.posts_img_url} alt="이미지" />
      <section className="absolute bottom-0 w-full h-[100px] flex-col gap-3 bg-palette5">
        <div className="flex flex-row w-full h-[50%] items-center justify-between px-2">
          <div className="flex w-full text-2xl font-semibold truncate">{post.posts_title}</div>
          <div className="flex text-xl font-medium flex-shrink-0">⭐{post.posts_review}</div>
        </div>
        <div className="flex flex-row w-full h-[50%] items-center justify-between px-2">
          <div className="flex w-full text-lg truncate">
            <ul className="flex flex-row gap-2">
              {(typeof post.posts_tags === 'string' ? post.posts_tags.split(',') : post.posts_tags || []).map(
                (tag, index) => (
                  <li key={index}>#{tag}</li>
                )
              )}
            </ul>
          </div>
          <div className="flex text-lg font-semibold flex-shrink-0">{post.users_nickname}</div>
        </div>
      </section>
    </div>
  );
};

export default NaviTalkPost;
