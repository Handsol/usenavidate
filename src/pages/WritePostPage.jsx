const WritePostPage = () => {
  return (
    <div className="w-full bg-palette4 flex flex-col items-center h-dvh">
      <div className="flex flex-row gap-10">
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
        <section>
          <label className="flex flex-col">
            <span className="text-palette2 font-bold text-[20px]">장소</span>{' '}
            <input type="text" className="border-4 border-white rounded-lg bg-inherit" />
          </label>
          <label className="flex flex-col">
            <span className="text-palette2 font-bold text-[20px]">주소</span>{' '}
            <input type="text" className="border-4 border-white rounded-lg bg-inherit" />
          </label>
          <label className="flex flex-col">
            <span className="text-palette2 font-bold text-[20px]">해쉬태그</span>{' '}
            <input type="text" className="border-4 border-white rounded-lg bg-inherit" />
          </label>
          <label className="flex flex-col">
            <span className="text-palette2 font-bold text-[20px]">상세 설명</span>
            <textarea name="" id="" className="border-4 border-white rounded-lg bg-inherit resize-none" />
          </label>
        </section>
      </div>
    </div>
  );
};

export default WritePostPage;
