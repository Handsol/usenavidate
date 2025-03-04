import NaviTalkPost from './NaviTalkPost';
import DateRoutePost from './DateRoutePost';
import { Link } from 'react-router-dom';
import { PATH } from '../shared/PATH';

const PostList = ({ posts, boardType }) => {
  return (
    <div className="w-[1300px] grid grid-cols-3 gap-10">
      {posts.map((post) =>
        boardType === 'navitalk' ? (
          <NaviTalkPost key={post.posts_id} post={post} />
        ) : (
          <DateRoutePost key={post.posts_id} post={post} />
        )
      )}
      {/* 게시글 작성 시 클릭할 버튼 */}
      <div className="flex flex-col items-end fixed bottom-6 right-6 gap-3 mr-2 mb-2">
        <div className="flex flex-row items-center gap-2">
          <p className="text-right text-2xl font-semibold text-palette2 cursor-default">데이트 루트 작성</p>
          <Link to={PATH.DATEWRITE}>
            <img src="/write_post_logo.png" alt="데이트 루트 작성" />
          </Link>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p className="text-right text-2xl font-semibold text-palette2 cursor-default">장소 리뷰 작성</p>
          <Link to={PATH.WRITEPOST}>
            <img src="/write_post_logo.png" alt="네비톡 작성" />
          </Link>
        </div>
        <button>
          <img src="/write_post_plus.png" alt="게시글 작성" />
        </button>
      </div>
    </div>
  );
};

export default PostList;
