import { useLocation } from 'react-router-dom';
import PostList from '../components/PostList';
import Search from '../components/Search';
import useFetchPosts from '../hooks/useFetchPosts';

const DateRoutePage = () => {
  const boardType = 'dateroute';

  const { posts, loading } = useFetchPosts(boardType);

  return (
    <div className="flex-col h-[100vh] max-w-[1300px] mx-auto bg-palette4">
      <Search />
      {loading ? (
        <p className="text-center text-lg text-palette1 mt-10">로딩 중...</p>
      ) : (
        <PostList posts={posts} boardType={boardType} />
      )}
    </div>
  );
};

export default DateRoutePage;
