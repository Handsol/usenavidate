import { Link } from 'react-router-dom';
import { PATH } from '../shared/PATH';

const NaviTalkPost = ({ post }) => {
  return (
    <Link
      to={PATH.NAVITALKDETAIL.replace(':id', post.posts_id)}
      className="relative h-[250px] rounded-3xl overflow-hidden cursor-pointer"
    >
      <img className="absolute inset-0 w-full h-full object-cover items-center" src={post.posts_img_url} alt="이미지" />
      <section className="absolute bottom-0 w-full h-[100px] flex-col gap-3 bg-palette5">
        <div className="flex flex-row w-full h-[50%] items-center justify-between px-2">
          <div className="flex w-full text-2xl font-semibold truncate">{post.posts_title}</div>
          <div className="flex text-xl font-medium flex-shrink-0">⭐{post.posts_review}</div>
        </div>
        <div className="flex flex-row w-full h-[50%] items-center justify-between px-2">
          <div className="flex w-full text-lg truncate">
            <ul className="flex flex-row gap-2">
              {post.posts_tag.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-200 rounded-lg text-sm">
                  #{tag}
                </span>
              ))}
            </ul>
          </div>
          <div className="flex text-lg font-semibold flex-shrink-0">{post.users_nickname}</div>
        </div>
      </section>
    </Link>
  );
};

export default NaviTalkPost;
