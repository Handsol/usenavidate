import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PostList from '../components/PostList';
import supabase from '../supabase/Client';

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q'); // ✅ 검색어 가져오기
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });

      if (error) {
        console.error('게시글 불러오기 오류:', error);
        return;
      }

      setAllPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (query) {
      setFilteredPosts(allPosts.filter((post) => post.posts_title.toLowerCase().includes(query.toLowerCase())));
    }
  }, [query, allPosts]);

  return (
    <div className="max-w-[1300px] mx-auto">
      <h1 className="text-2xl font-bold text-palette1 mb-4">검색 결과</h1>
      <PostList posts={filteredPosts} />
    </div>
  );
};

export default SearchPage;
