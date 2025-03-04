import { useEffect, useState } from 'react';
import supabase from '../supabase/Client';

const ProfileForm = ({ publicUrl }) => {
  const [userData, setUserData] = useState();
  const [formData, setFormData] = useState({
    users_avatar: null,
    users_nickname: ''
  });

  // upsert (true) > 없는 파일이면 insert > 있는 파일이면 update

  useEffect(() => {
    const getUserData = async () => {
      const session = JSON.parse(localStorage.getItem('session'));
      const authData = session.user;
      const userEmail = authData.email;
      const { data, error } = await supabase.from('users').select('*').eq('users_email', userEmail);

      setUserData(data[0]);
    };
    getUserData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateUserData = async () => {
      const authData = JSON.parse(localStorage.getItem('session')).user;
      const userId = authData.id;
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('users_id', userId)
        .upsert({ users_nickname: formData, users_avatar: publicUrl });

      if (error) {
        console.error('오류 발생', error);
        alert('업데이트 오류');
      } else {
        alert('업데이트 완료');
        setFormData({
          nickname: ''
        });
      }
    };
    updateUserData();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col text-palette6 w-full p-4">
        <div className="flex flex-col gap-3">
          <label className="text-palette1 text-1xl font-semibold">EMAIL</label>
          <input
            type="text"
            className="border-4 border-white rounded-lg bg-palette5 p-2 placeholder-palette2"
            placeholder={`${userData?.users_email}`}
            disabled
          />
          <span className="text-sm text-palette8">e-mail은 변경할 수 없습니다.</span>
          <label className="text-palette1 text-1xl font-semibold">Nickname</label>
          <input
            type="text"
            name="nickname"
            className="border-4 border-white rounded-lg bg-inherit p-2 placeholder-palette2"
            placeholder={`${userData?.users_nickname}`}
            value={formData.users_nickname}
            onChange={handleChange}
          />
        </div>
        <button
          className="text-center bg-palette1 text-palette5 items-center w-full rounded-full px-20 py-2 mt-20"
          type="submit"
        >
          수정하기
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
