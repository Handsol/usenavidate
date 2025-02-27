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

  const createUser = async () => {
    const { data, error } = await supabase.from('users').insert([
      {
        nickname: '허니',
        email: 'test1@test.com',
        avatar: 'https://img.cgv.co.kr/Movie/Thumbnail/StillCut/000086/86072/86072210520_727.jpg'
      }
    ]);
  };

  return (
    <div className=" bg-palette4 text-center text-palette6 items-center w-100 h-100 p-4">
      <div className="bg-palette1 min-w-xs text-palette5 rounded-md text-2xl">MyList</div>
      <div className="py-5">
        <section className="pt-4">
          <div className="bg-palette2 rounded-md">내가 좋아요한 게시글</div>
          <div className="pt-4">(여기에 게시글 리스트 뿌리기)</div>
        </section>
        <section className="pt-4">
          <div className="bg-palette2 rounded-md">내가 작성한 게시글</div>
          <div className="pt-4">(여기에 내 게시글 리스트 뿌리기)</div>
        </section>
      </div>
      {/* supabase 테스트용 코드 */}

      {userData.map((item) => (
        <div key={item.user_id}>
          <div>{item.email}</div>
          <div>{item.nickname}</div>
          <img src={item.avatar} />
        </div>
      ))}

      <button onClick={() => createUser()}>데이터 작성 확인용</button>
    </div>
  );
};

export default MyPage;
