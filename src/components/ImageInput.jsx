import { useEffect, useRef, useState } from 'react';
import supabase from '../supabase/Client';
import { useAuthUser } from '../hooks/useAuthUser';
import { AlertInfo } from '../common/Alert';

export const ImageInput = ({ setPublicUrl }) => {
  const [showImage, setShowImage] = useState(null);
  const [uploadAvatar, setUploadAvatar] = useState('');
  const fileInputRef = useRef(null);

  const handleAddImage = async (e) => {
    const avatar_image = e.target.files[0];
    const currentImageUrl = URL.createObjectURL(avatar_image);
    setShowImage(currentImageUrl);
    setUploadAvatar(avatar_image);
  };

  const { user } = useAuthUser();

  console.log(user);

  const handleUploadImage = async () => {
    const { data: imageData, error } = await supabase.storage
      .from('profile-images')
      .upload(`public/avatar/${crypto.randomUUID()}`, uploadAvatar);
    if (!error) {
      AlertInfo('이미지 업로드 완료');
      setPublicUrl(
        `https://yaaahfifliqyixbtxbjn.supabase.co/storage/v1/object/public/profile-images//${imageData.path}`
      );
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* 이미지 업로드하기 */}
      <label htmlFor="input-file" className="addImage" onChange={handleAddImage}>
        <input type="file" ref={fileInputRef} />
        <div className="bg-slate-300" />
      </label>
      {/* 업로드한 이미지가 존재할 때 이미지 미리보기 생성 */}
      {user?.user_metadata.avatar !== null ? (
        <div className="bg-cover w-80 h-80">
          <img src={showImage} />
          {/* <button onClick={() => handleDeleteImage()}>삭제</button> */}
          <button
            onClick={() => handleUploadImage()}
            className="text-center bg-palette1 text-palette5 items-center w-full rounded-full px-20 py-2 mt-20"
          >
            업로드
          </button>
        </div>
      ) : (
        // 기본 아바타 이미지
        <div className="bg-cover w-80 h-80">
          <img src={'/profile_img.png'} />
        </div>
      )}
    </div>
  );
};
