import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PostList from '../components/PostList';
import supabase from '../supabase/Client';
import Search from '../components/Search';

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q'); // ✅ URL에서 검색어 가져오기
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*, posts_tag (tag_name)') // ✅ posts_tag 테이블을 조인하여 가져오기
        .order('created_at', { ascending: false });

      if (error) {
        console.error('게시글 불러오기 오류:', error);
        return;
      }

      // ✅ posts_tag 데이터를 배열 형태로 변환
      const formattedPosts = data.map((post) => ({
        ...post,
        posts_tag: post.posts_tag ? post.posts_tag.map((tag) => tag.tag_name) : []
      }));

      setAllPosts(formattedPosts);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (query) {
      setFilteredPosts(
        allPosts
          .filter((post) => post.posts_title.toLowerCase().includes(query.toLowerCase()))
          .map((post) => ({
            ...post,
            posts_tag: post.posts_tag || [] // ✅ 태그가 사라지지 않도록 유지
          }))
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
          <p className="text-lg text-gray-500">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
