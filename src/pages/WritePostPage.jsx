import { useEffect, useState } from 'react';

const WritePostPage = () => {
  const [marketName, setMarketName] = useState('');
  const [address, setAddress] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const postSubmit = (e) => {
    e.preventDefault();
    console.log('가게이름 =>', marketName);
    console.log('주소 =>', address);
    console.log('별점 =>', rating);
    console.log('상세설명 =>', description);
    setMarketName('');
    setAddress('');
    setRating('');
    setDescription('');
  };

  const postImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);
  return (
    <div className="w-full bg-palette4 flex flex-col justify-center items-center h-dvh">
      <form onSubmit={postSubmit} className="flex flex-row gap-10 bg-[#fdf9e1] p-6 rounded-xl shadow-xl">
        <section className="flex flex-col items-center">
          <label className="flex flex-col mb-4 text-palette2 font-bold text-[20px]">
            사진
            <div
              className={`bg-white w-[400px] h-[400px] rounded-xl bg-no-repeat bg-center ${
                image ? : `bg-[url('./assets/img-plus.png')]`
              }`}
            ></div>
            <div className="flex flex-row justify-around mt-4">
              <div className="w-[90px] h-[90px] bg-white rounded-xl bg-[url('./assets/img-plus.png')] bg-no-repeat bg-center bg-[length:34px_34px]"></div>
              <div className="w-[90px] h-[90px] bg-white rounded-xl bg-[url('./assets/img-plus.png')] bg-no-repeat bg-center bg-[length:34px_34px]"></div>
              <div className="w-[90px] h-[90px] bg-white rounded-xl bg-[url('./assets/img-plus.png')] bg-no-repeat bg-center bg-[length:34px_34px]"></div>
              <div className="w-[90px] h-[90px] bg-white rounded-xl bg-[url('./assets/img-plus.png')] bg-no-repeat bg-center bg-[length:34px_34px]"></div>
            </div>
          </label>
          <div className="flex flex-row gap-2">
            <input
              type="file"
              className="bg-inherit border-4 border-white rounded-lg text-transparent cursor-pointer flex-1 w-1/2 p-1
                        file:border-none file:bg-inherit file:text-palette2 file:font-bold file:text-[20px]
                        file:w-full file:px-0 file:cursor-pointer"
              onChange={postImage}
            />
            <button className="bg-inherit border-4 border-white rounded-lg cursor-pointer flex-1 w-1/2 p-1 text-palette2 font-bold text-[20px]">
              파일 제거
            </button>
          </div>
        </section>
        <section className="flex flex-col gap-7">
          <label className="flex flex-col">
            <span className="text-palette2 font-bold text-[20px]">가게 이름</span>{' '}
            <input
              type="text"
              className="border-4 border-white rounded-lg bg-inherit w-[450px] p-2"
              value={marketName}
              onChange={(e) => setMarketName(e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-palette2 font-bold text-[20px]">주소</span>{' '}
            <input
              type="text"
              className="border-4 border-white rounded-lg bg-inherit w-[450px] p-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-palette2 font-bold text-[20px]">해쉬태그</span>{' '}
            <input
              type="text"
              className="border-4 border-white rounded-lg bg-inherit w-[450px] p-2 placeholder:text-palette7"
              placeholder="최대 10개까지 입력할 수 있습니다."
            />
          </label>
          <label className="flex flex-col">
            <span className="text-palette2 font-bold text-[20px]">별점</span>
            <select
              className="bg-inherit border-white border-4 rounded-lg p-2"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="⭐">⭐</option>
              <option value="⭐⭐">⭐⭐</option>
              <option value="⭐⭐⭐">⭐⭐⭐</option>
              <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
              <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
            </select>
          </label>
          <label className="flex flex-col">
            <span className="text-palette2 font-bold text-[20px]">상세 설명</span>
            <textarea
              value={description}
              className="border-4 border-white rounded-lg bg-inherit resize-none p-2 h-32 "
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-palette5 bg-palette1 py-1 px-4 rounded-full transition hover:bg-palette2"
            >
              등록
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default WritePostPage;
