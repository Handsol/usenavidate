import NavitalkPost from '../components/NaviTalkPost';
import PostList from '../components/PostList';
import Search from '../components/Search';

const NaviTalkPage = () => {
  return (
    <div className="flex-col h-[100vh] max-w-[1300px] mx-auto bg-palette4">
      <Search />
      <PostList>
        <NavitalkPost />
      </PostList>
    </div>
  );
};

export default NaviTalkPage;
