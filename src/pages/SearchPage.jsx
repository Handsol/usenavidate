import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PostList from '../components/PostList';
import supabase from '../supabase/Client';
import Search from '../components/Search';

const SearchPage = () => {
  const location = useLocation();
  // url 에 검색어 가져오는 로직
  const query = new URLSearchParams(location.search).get('q');
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*, posts_tag (tag_name), posts_photos (posts_img_url)')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('게시글 불러오기 오류:', error);
        return;
      }

      // posts_tag 데이터를 배열 형태로 변환
      const formattedPosts = data.map((post) => ({
        ...post,
        posts_tag: post.posts_tag ? post.posts_tag.map((tag) => tag.tag_name) : [],
        posts_img_url: post.posts_photos?.length > 0 ? post.posts_photos[0].posts_img_url : '/navi_talk_default.png' // ✅ 첫 번째 이미지만 가져오고 없으면 기본 이미지
      }));

      setAllPosts(formattedPosts);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (query) {
      setFilteredPosts(
        allPosts.filter(
          (post) =>
            // 제목과 태그를 검색어로 포함
            post.posts_title.toLowerCase().includes(query.toLowerCase()) ||
            post.posts_tag.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
        )
      );
    }
  }, [query, allPosts]);

  return (
    <div>
      <Search />
      <div className="flex flex-col items-center gap-10 max-w-[1300px] mx-auto">
        <h1 className="text-2xl font-bold text-palette1 mb-4">🔍 검색 결과</h1>
        {filteredPosts.length > 0 ? (
          <PostList posts={filteredPosts} />
        ) : (
          <p className="text-lg text-palette1">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
