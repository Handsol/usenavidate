import DateRoutePost from '../components/DateRoutePost';
import supabase from '../supabase/Client';
import { useEffect, useState } from 'react';

const MyPage = () => {
  // supabase 연결용 테스트 코드
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    const userId = session.user.id;
    const userNickname = session.user.user_metadata.nickname;
    console.log(session);
    console.log(userNickname);

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
      console.log(postsData);
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
      // const { data: usersData, error: usersError } = await supabase
      //   .from('users')
      //   .select('users_id, users_nickname')
      //   .in('users_id', userId);

      // if (usersError || !usersData) {
      //   console.error('유저 닉네임 불러오기 오류:', usersError);
      //   return;
      // }

      // 데이터 매칭
      const formattedPosts = postsData.map((post) => {
        return {
          ...post,
          posts_img_url: photosData?.find((photo) => photo.posts_id === post.posts_id)?.posts_img_url || null
        };
      });

      setPosts(formattedPosts);
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col bg-palette4 text-center text-palette6 justify-center w-full h-screen p-4">
      <div className="flex bg-palette1 w-10% self-center text-palette5 text-2xl rounded-full px-8 py-2">MyList</div>
      <section className="flex flex-col flex-grow-0 justify-center pt-4">
        <div className="bg-palette2 w-10% self-center text-palette5 text-lg rounded-full px-8 py-2 mt-4">
          내가 작성한 게시글
        </div>{' '}
        <div className="w-[1300px] grid grid-cols-3 gap-10">
          {posts.map((post) => (
            <DateRoutePost key={post.posts_id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MyPage;
