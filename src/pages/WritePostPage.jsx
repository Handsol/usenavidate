import { useState } from 'react';

const WritePostPage = () => {
  const [marketName, setMarketName] = useState('');
  const [address, setAddress] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([null, null, null, null]);
  const [isChange, setIsChange] = useState(false);

  const postImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setIsChange(true);
    }
  }

  const removeImage = (e) => {
    e.preventDefault();
    setImage(null);
    setIsChange(false);
  }

  const postMultipleImages = (e, index) => {

    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // 파일 URL 생성
      const newImages = [...images];
      newImages[index] = imageUrl; // 해당 인덱스의 이미지 URL 업데이트
      setImages(newImages); // 상태 업데이트
      setIsChange(true);
    }
  };

  // 이미지 삭제 함수
  const removeMultipleImage = (index) => {
    const newImages = [...images];
    newImages[index] = null; // 해당 인덱스의 이미지를 null로 설정
    setImages(newImages); // 상태 업데이트
  };


  return (
    <div className="w-full bg-palette4 flex flex-col justify-center items-center h-dvh">
      <form className="flex flex-row gap-10 bg-[#fdf9e1] p-6 rounded-xl shadow-xl">
        <section className="flex flex-col items-center">
          <label className="flex flex-col mb-4 text-palette2 font-bold text-[20px]">
            사진
            {isChange && image ? (
              <div className='relative'>
                <img src={image} alt="" className="bg-white w-[400px] h-[400px] rounded-xl bg-no-repeat bg-center" onClick={() => setIsChange(false)} />
                <button type='button' onClick={removeImage} className='absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-[13px]'>X</button>
              </div>
            ) : (
              <input type="file" className="bg-white cursor-pointer w-[400px] h-[400px] rounded-xl bg-no-repeat bg-center bg-[url('./assets/img-plus.png')]
                                            file:border-none file:bg-inherit file:text-transparent
                                            file:w-full file:px-0 file:cursor-pointer"
                onChange={postImage} />
            )}
          </label>
          <div className="flex flex-row gap-3 mt-4">
            {images.map((img, index) => (
              <div key={index} className="relative w-[90px] h-[90px] cursor-pointer bg-white rounded-xl bg-[url('./assets/img-plus.png')] bg-no-repeat bg-center bg-[length:34px_34px]" >
                {img ? (
                  <>
                    <img src={img} alt={`image-${index}`} className='w-full h-full object-cover rounded-xl' onChange={() => setIsChange(false)} />
                    <button type='button'
                      onClick={() => removeMultipleImage(index)}
                      className='absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-[13px]'>
                      X
                    </button>
                  </>
                ) : (
                  <label className='w-full h-full cursor-pointer'>
                    <input type="file"
                      className='w-full h-full opacity-0 file:border-none file:bg-inherit file:text-transparent
                             file:w-full file:px-0 file:cursor-pointer cursor-pointer'
                      onChange={(e) => postMultipleImages(e, index)} />
                    <div className="w-full h-full bg-no-repeat bg-center bg-cover rounded-xl cursor-pointer"></div>
                  </label>
                )
                }
              </div>
            ))}
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
