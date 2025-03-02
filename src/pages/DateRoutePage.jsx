import { useEffect, useState } from 'react';
import PostList from '../components/PostList';
import Search from '../components/Search';
import supabase from '../supabase/Client';
import { useLocation } from 'react-router-dom';

const DateRoutePage = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  // 현재 접속한 경로를 기반으로 boardType을 가져옴
  const boardType = location.pathname.includes('navitalk') ? 'navitalk' : '';

  useEffect(() => {
    const fetchPosts = async () => {
      // Supabase에서 게시글 데이터 불러오기
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .eq('board_type', 'dateroute')
        .order('created_at', { ascending: false });

      if (postsError || !postsData) {
        console.error('게시글 불러오기 오류:', postsError);
        return;
      }

      // 게시글 ID 리스트 가져오기
      const postIds = postsData.map((post) => post.posts_id);

      // 이미지 가져오기
      const { data: photosData, error: photosError } = await supabase
        .from('posts_photos')
        .select('posts_id, posts_img_url')
        .in('posts_id', postIds);

      if (photosError || !photosData) {
        console.error('이미지 불러오기 오류:', photosError);
        return;
      }

      // 작성자 닉네임 가져오기
      const userIds = postsData.map((post) => post.users_id);
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('users_id, users_nickname')
        .in('users_id', userIds);

      if (usersError || !usersData) {
        console.error('유저 닉네임 불러오기 오류:', usersError);
        return;
      }

      // 데이터 매칭
      const formattedPosts = postsData.map((post) => {
        return {
          ...post,
          posts_img_url: photosData?.find((photo) => photo.posts_id === post.posts_id)?.posts_img_url || null,
          users_nickname: usersData?.find((user) => user.users_id === post.users_id)?.users_nickname || '닉네임 없음'
        };
      });

      setPosts(formattedPosts);
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex-col h-[100vh] max-w-[1300px] mx-auto bg-palette4">
      <Search />
      <PostList posts={posts} boardType={boardType} />
    </div>
  );
};

export default DateRoutePage;
