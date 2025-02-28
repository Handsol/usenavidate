import supabase from '../supabase/Client';
import { useEffect, useState } from 'react';

const MyPage = () => {
  // supabase 연결용 테스트 코드
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const { data, error } = await supabase.from('users').select('*');
      setUserData(data);
    };
    getUserData();
  }, []);

  return (
    <div className="flex flex-col bg-palette4 text-center text-palette6 justify-center w-full h-screen p-4">
      <div className="flex bg-palette1 w-10% self-center text-palette5 text-2xl rounded-full px-8 py-2">MyList</div>
      <section className="flex flex-col flex-grow-0 justify-center pt-4">
        <div className="bg-palette2 w-10% self-center text-palette5 text-lg rounded-full px-8 py-2 mt-4">
          내가 좋아요한 게시글
          {/* 데이트 코스 포스트(피드) 리스트 레이아웃 그대로 가져올 예정 아래는 스켈레톤 예시 */}
        </div>
        <div className="flex flex-shrink-0 justify-center gap-12 pt-2 mt-2">
          <div className="bg-palette5 w-96 min-h-52 p-1 rounded-2xl" />
          <div className="bg-palette5 w-96 min-h-52 p-1 rounded-2xl" />
          <div className="bg-palette5 w-96 min-h-52 p-1 rounded-2xl" />
        </div>
      </section>
      <section className="flex flex-col flex-grow-0 justify-center pt-4">
        <div className="bg-palette2 w-10% self-center text-palette5 text-lg rounded-full px-8 py-2 mt-4">
          내가 작성한 게시글
        </div>{' '}
        {/* 데이트 코스 포스트(피드) 리스트 레이아웃 그대로 가져올 예정 */}
        {/* supabase 확인용으로 user 가입 정보로 작성했으니 예시로만 봐주세요  */}
        <div className="flex flex-shrink-0 justify-center gap-12 pt-2 mt-2">
          {userData.map((item) => (
            <div className="bg-palette5 self-center w-10% h-10% p-2 rounded-2xl" key={item.user_id}>
              <div className="text-lg">{item.email}</div>
              <div className="text-xs">{item.nickname}</div>
              <div className="bg-cover overflow-hidden h-40">
                <img src={item.avatar} className="w-[200px]" alt="..." />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MyPage;
