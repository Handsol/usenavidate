import { useEffect, useState } from 'react';
import supabase from '../supabase/Client';

const useFetchPostDetail = (postId) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // postId가 없으면 실행되지 않음
    if (!postId) return;

    const fetchPost = async () => {
      setLoading(true);

      // 게시글 데이터 가져오기
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('*')
        .eq('posts_id', postId)
        .single();

      if (postError || !postData) {
        console.error('게시글 불러오기 오류:', postError);
        setLoading(false);
        return;
      }

      // 이미지 가져오기
      const { data: photosData, error: photosError } = await supabase
        .from('posts_photos')
        .select('posts_id, posts_img_url')
        .eq('posts_id', postId);

      if (photosError) {
        console.error('이미지 불러오기 오류:', photosError);
      }

      // 최종 데이터 정리
      setPost({
        ...postData,
        posts_img_url: photosData?.map((photo) => photo.posts_img_url) || []
      });

      setLoading(false);
    };

    fetchPost();
  }, [postId]);

  return { post, loading };
};

export default useFetchPostDetail;
