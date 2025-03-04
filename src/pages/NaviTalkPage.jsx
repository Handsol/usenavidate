import { useLocation } from 'react-router-dom';
import PostList from '../components/PostList';
import Search from '../components/Search';
import useFetchPosts from '../hooks/useFetchPosts';

const NaviTalkPage = () => {
  const location = useLocation();
  const boardType = location.pathname.includes('navitalk') ? 'navitalk' : '';

  const { posts, loading } = useFetchPosts(boardType);

  return (
    <div className="flex-col h-[100vh] max-w-[1300px] mx-auto bg-palette4">
      <Search />
      {loading ? (
        <p className="text-center text-lg text-gray-500 mt-10">로딩 중...</p>
      ) : (
        <PostList posts={posts} boardType={boardType} />
      )}
    </div>
  );
};

export default NaviTalkPage;
