import NaviTalkPost from './NaviTalkPost';
import DateRoutePost from './DateRoutePost';
import { Link } from 'react-router-dom';
import { PATH } from '../shared/PATH';
import { useState } from 'react';

const PostList = ({ posts, boardType }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[1200px] grid grid-cols-3 gap-10">
      {posts.map((post) =>
        boardType === 'navitalk' ? (
          <NaviTalkPost key={post.posts_id} post={post} />
        ) : (
          <DateRoutePost key={post.posts_id} post={post} />
        )
      )}

      {/* 게시글 작성 버튼 */}
      <div className="flex flex-col items-end fixed bottom-6 right-6 gap-3 mr-2 mb-2">
        {/* 토글 될 버튼 목록 */}
        <div
          className={`flex flex-col items-end gap-3 overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
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
        </div>

        {/* + 버튼 애니메이션 */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          <img src="/write_post_plus.png" alt="게시글 작성" />
        </button>
      </div>
    </div>
  );
};

export default PostList;
