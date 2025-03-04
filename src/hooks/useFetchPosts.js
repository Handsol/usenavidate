import { useEffect, useState } from 'react';
import supabase from '../supabase/Client';

const useFetchPosts = (boardType) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      // Supabase에서 게시글 데이터 불러오기
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .eq('board_type', boardType)
        .order('created_at', { ascending: false });

      if (postsError || !postsData) {
        console.error('게시글 불러오기 오류:', postsError);
        setLoading(false);
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
        setLoading(false);
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
        setLoading(false);
        return;
      }

      // 게시글 태그 불러오기
      const { data: tagsData, error: tagsError } = await supabase.from('posts_tag').select('*');

      if (tagsError || !tagsData) {
        console.error('태그 불러오기 오류:', tagsError);
        setLoading(false);
        return;
      }

      // 데이터 매칭
      const formattedPosts = postsData.map((post) => ({
        ...post,
        posts_img_url: photosData?.find((photo) => photo.posts_id === post.posts_id)?.posts_img_url || null,
        users_nickname: usersData?.find((user) => user.users_id === post.users_id)?.users_nickname || '닉네임 없음',
        posts_tag: tagsData.filter((tag) => tag.posts_id === post.posts_id).map((tag) => tag.tag_name)
      }));

      setPosts(formattedPosts);
      setLoading(false);
    };

    fetchPosts();
  }, [boardType]);

  return { posts, loading };
};

export default useFetchPosts;
