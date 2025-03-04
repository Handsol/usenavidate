import { Link } from 'react-router-dom';
import { PATH } from '../shared/PATH';

const DateRoutePost = ({ post }) => {
  return (
    <Link
      to={PATH.DATEDETAIL.replace(':id', post.posts_id)}
      className="relative h-[250px] rounded-3xl overflow-hidden cursor-pointer"
    >
      <img className="absolute inset-0 w-full h-full object-cover items-center" src={post.posts_img_url} alt="이미지" />
      <section className="absolute bottom-0 w-full h-[100px] flex-col gap-3 bg-palette5">
        <div className="flex flex-row w-full h-[50%] items-center justify-between px-5 pt-3">
          <div className="flex w-full text-xl text-palette6 font-semibold truncate">{post.posts_title}</div>
          <div className="flex text-lg font-medium flex-shrink-0 text-palette6">⭐{post.posts_review}</div>
        </div>
        <div className="flex flex-row w-full h-[50%] items-center justify-between px-5 pb-3">
          <div className="flex w-full">
            <ul className="flex gap-2">
              {post.posts_tag.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-palette8 rounded-lg text-sm text-palette5">
                  #{tag}
                </span>
              ))}
            </ul>
          </div>
          <div className="flex text-lg font-semibold flex-shrink-0 text-palette6">{post.posts_value}</div>
        </div>
      </section>
    </Link>
  );
};

export default DateRoutePost;
