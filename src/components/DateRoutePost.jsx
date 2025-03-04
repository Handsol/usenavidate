import { Link } from 'react-router-dom';
import { PATH } from '../shared/PATH';

const DateRoutePost = ({ post }) => {
  return (
    <Link
      to={PATH.DATEDETAIL.replace(':id', post.posts_id)}
      className="relative h-52 rounded-3xl overflow-hidden cursor-pointer"
    >
      <img className="absolute inset-0 w-full h-full object-cover items-center" src={post.posts_img_url} alt="이미지" />
      <section className="absolute bottom-0 w-full h-24 flex-col bg-palette5">
        <div className="flex flex-row w-full h-1/2 items-center justify-between px-4 pt-2">
          <div className="flex w-full text-xl text-palette7 font-semibold">{post.posts_title}</div>
          <div className="flex text-md font-semibold flex-shrink-0 text-palette7">⭐{post.posts_review}</div>
        </div>
        <div className="flex flex-row w-full h-1/2 items-center justify-between px-4 pb-3">
          <div className="flex w-full">
            <ul className="flex gap-2">
              {post.posts_tag.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-[#8985cc] rounded-md font-medium text-sm text-palette5">
                  #{tag}
                </span>
              ))}
            </ul>
          </div>
          <div className="flex text-lg font-semibold flex-shrink-0 text-palette8">{post.posts_value}</div>
        </div>
      </section>
    </Link>
  );
};

export default DateRoutePost;
