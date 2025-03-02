import NaviTalkPost from './NaviTalkPost';

const PostList = ({ posts }) => {
  return (
    <div className="w-[1300px] grid grid-cols-3 gap-10">
      {posts.map((post) => (
        <NaviTalkPost key={post.posts_id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
