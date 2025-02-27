const WritePostPage = () => {
  return (
    <div className="w-full bg-palette4 flex flex-col justify-center items-center h-dvh">
      <div className="flex flex-row gap-10 bg-[#fdf9e1] p-6 rounded-xl shadow-xl">
        <section className="flex flex-col">
          <label className="flex flex-col mb-4 text-palette2 font-bold text-[20px]">
            사진
            <div className="bg-white w-[400px] h-[400px]  rounded-xl"></div>
            <div className="flex flex-row justify-around mt-4">
              <div className="w-[90px] h-[90px] bg-white rounded-xl"></div>
              <div className="w-[90px] h-[90px] bg-white rounded-xl"></div>
              <div className="w-[90px] h-[90px] bg-white rounded-xl"></div>
              <div className="w-[90px] h-[90px] bg-white rounded-xl"></div>
            </div>
          </label>
          <div className="flex flex-row gap-2">
            <input
              type="file"
              className="bg-inherit border-4 border-white rounded-lg text-transparent cursor-pointer flex-1 w-[140px] p-1
                        file:border-none file:bg-inherit file:text-palette2 file:font-bold file:text-[20px]
                        file:w-full file:px-0 file:cursor-pointer"
            />
            <button className="bg-inherit border-4 border-white rounded-lg cursor-pointer flex-1 w-[140px] p-1 text-palette2 font-bold text-[20px]">
              파일 제거
            </button>
          </div>
        </section>
        <section className="flex flex-col gap-7">
          <label className="flex flex-col">
            <span className="text-palette2 font-bold text-[20px]">가게 이름</span>{' '}
            <input type="text" className="border-4 border-white rounded-lg bg-inherit w-[450px] p-2" />
          </label>
          <label className="flex flex-col">
            <span className="text-palette2 font-bold text-[20px]">주소</span>{' '}
            <input type="text" className="border-4 border-white rounded-lg bg-inherit w-[450px] p-2" />
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
            <select className="bg-inherit border-white border-4 rounded-lg p-2">
              <option selected>⭐</option>
              <option>⭐⭐</option>
              <option>⭐⭐⭐</option>
              <option>⭐⭐⭐⭐</option>
              <option>⭐⭐⭐⭐⭐</option>
            </select>
          </label>
          <label className="flex flex-col">
            <span className="text-palette2 font-bold text-[20px]">상세 설명</span>
            <textarea name="" id="" className="border-4 border-white rounded-lg bg-inherit resize-none p-2 h-32 " />
          </label>
          <div className="flex justify-end">
            <button className="text-palette5 bg-palette1 py-1 px-4 rounded-full transition hover:bg-palette2">
              등록
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WritePostPage;
