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
    <div className="grid bg-palette4 text-center text-palette6 justify-center w-full h-screen p-4">
      <div className="grid bg-palette1 w-10% self-center text-palette5 text-2xl rounded-full">MyList</div>
      <div className="py-5">
        <section className="pt-4">
          <div className="bg-palette2 w-10% text-palette5 text-lg rounded-full">내가 좋아요한 게시글</div>
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="bg-palette5 w-44 min-h-36 p-1 rounded-2xl" />
            <div className="bg-palette5 w-44 min-h-36 p-1 rounded-2xl" />
            <div className="bg-palette5 w-44 min-h-36 p-1 rounded-2xl" />
          </div>
        </section>
        <section className="pt-4">
          <div className="bg-palette2 w-10% text-palette5 text-lg rounded-full">내가 작성한 게시글</div>
          <div className="pt-4">
            <div /> <div /> <div />
          </div>
        </section>
      </div>

      {/* supabase 테스트용 코드 */}
      <div className="grid grid-cols-3 gap-4">
        {userData.map((item) => (
          <div className="grid bg-palette5 items-center w-10% h-10% p-4 rounded-2xl" key={item.user_id}>
            <div className="text-lg">{item.email}</div>
            <div className="text-xs">{item.nickname}</div>
            <div className="bg-cover overflow-hidden">
              <img src={item.avatar} className="w-full" alt="..." />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPage;
