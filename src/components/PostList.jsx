import NaviTalkPost from './NaviTalkPost';
import DateRoutePost from './DateRoutePost';

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
    </div>
  );
};

export default PostList;
