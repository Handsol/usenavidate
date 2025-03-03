import { useEffect, useState } from 'react';
import supabase from '../supabase/Client';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    nickname: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateUserData = async () => {
      const { error } = await supabase.auth.updateUser(formData);
      if (error) {
        console.error('오류 발생', error);
        alert('업데이트 오류');
      } else {
        alert('업데이트 완료');
        setFormData({
          nickname: '',
          password: ''
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
          <label className="text-palette1 text-1xl font-semibold">ID</label>
          <input
            type="text"
            name="id"
            className="border-4 border-white rounded-lg bg-inherit p-2 placeholder-palette2"
            placeholder="ID"
            disabled
          />
          <span className="text-sm text-palette8">ID는 변경할 수 없습니다.</span>
          <label className="text-palette1 text-1xl font-semibold">Nickname</label>
          <input
            type="text"
            name="nickname"
            className="border-4 border-white rounded-lg bg-inherit p-2 placeholder-palette2"
            placeholder="닉네임"
            value={formData.nickname}
            onChange={handleChange}
          />
          <label className="text-palette1 text-1xl font-semibold">password</label>
          <input
            type="text"
            name="password"
            className="border-4 border-white rounded-lg bg-inherit p-2 placeholder-palette2"
            placeholder="password"
            value={formData.password}
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
