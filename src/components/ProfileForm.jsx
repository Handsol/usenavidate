import { useEffect, useState } from 'react';
import supabase from '../supabase/Client';
import { ImageInput } from './ImageInput';
import { useAuthUser } from '../hooks/useAuthUser';
import { AlertError, AlertInfo } from '../common/Alert';

const ProfileForm = () => {
  const { user } = useAuthUser();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    users_avatar: null,
    users_nickname: ''
  });
  const [publicUrl, setPublicUrl] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      console.log('user', user);
      const { data, error } = await supabase.from('users').select('users_nickname').eq('users_id', user.id).single();

      setFormData({ ...formData, users_nickname: data.users_nickname });
    };
    getUser();
  }, []);

  // upsert (true) > 없는 파일이면 insert > 있는 파일이면 update

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateUserData = async () => {
      const { data: fetchData, error } = await supabase
        .from('users')
        .upsert({ ...formData, users_email: user.email, users_avatar: publicUrl, users_id: user.id })
        .select('*');

      if (error) {
        console.error('오류 발생', error);
        AlertError('업데이트 오류');
      } else {
        AlertInfo('업데이트 완료');
        setUserData(fetchData);
      }
    };
    updateUserData();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-row justify-around">
      <ImageInput setPublicUrl={setPublicUrl} />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col text-palette6 w-full p-4">
          <div className="flex flex-col gap-3">
            <label className="text-palette1 text-1xl font-semibold">EMAIL</label>
            <input
              type="text"
              className="border-4 border-white rounded-lg bg-palette5 p-2 placeholder-palette2"
              placeholder={`${user?.email}`}
              disabled
            />
            <span className="text-sm text-palette8">e-mail은 변경할 수 없습니다.</span>
            <label className="text-palette1 text-1xl font-semibold">Nickname</label>
            <input
              type="text"
              name="users_nickname"
              className="border-4 border-white rounded-lg bg-inherit p-2 placeholder-palette2"
              placeholder="닉네임을 입력해주세요."
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
    </div>
  );
};

export default ProfileForm;
