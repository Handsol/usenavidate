const NaviTalkDetail = () => {
  return (
    <div className="flex flex-col h-[100vh] max-w-[1000px] mx-auto bg-palette4 gap-6">
      <p className="flex mt-10 text-2xl font-semibold text-palette1">Location</p>
      {/* 지도 */}
      <div className="flex flex-col gap-5">
        <p className="flex text-2xl font-semibold text-center">어쩌구 저쩌구 주소</p>
        <div className="flex w-full h-[450px] justify-center items-center bg-gray-400 rounded-3xl">여기는 지도</div>
      </div>
      {/* 사진 첨부 */}
      <div className="flex flex-row w-full h-[170px] justify-between">
        <div className="flex w-[170px] h-[170px] bg-gray-400 rounded-3xl" />
        <div className="flex w-[170px] h-[170px] bg-gray-400 rounded-3xl" />
        <div className="flex w-[170px] h-[170px] bg-gray-400 rounded-3xl" />
        <div className="flex w-[170px] h-[170px] bg-gray-400 rounded-3xl" />
        <div className="flex w-[170px] h-[170px] bg-gray-400 rounded-3xl" />
      </div>
      {/* 장소 설명 */}
      <section className="flex flex-col gap-5">
        <div className="flex flex-row justify-between gap-2">
          <div className="flex flex-col w-[75%] gap-1">
            <p className="flex text-xl font-semibold text-palette1 pl-3">상호명</p>
            <div className="flex w-full h-[60px] border-4 border-palette5 text-2xl items-center rounded-3xl pl-5">
              여기에 상호명이 들어갑니다
            </div>
          </div>
          <div className="flex flex-col w-[20%] gap-1">
            <p className="flex text-xl font-semibold text-palette1 pl-3">별점</p>
            <div className="flex w-full h-[60px] border-4 border-palette5 text-2xl justify-center items-center rounded-3xl">
              ⭐⭐⭐⭐⭐
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-1">
          <p className="flex text-xl font-semibold text-palette1 pl-3">해쉬태그</p>
          <div className="flex w-full h-[60px] border-4 border-palette5 text-2xl items-center rounded-3xl pl-5">
            해당 부분은 변경될 예정
          </div>
        </div>
        <div className="flex flex-col w-full gap-1">
          <p className="flex text-xl font-semibold text-palette1 pl-3">상세 설명</p>
          <div className="flex w-full h-[200px] border-4 border-palette5 text-2xl rounded-3xl p-5">
            음식이 친절하고 사장님이 맛있어요
          </div>
        </div>
      </section>
    </div>
  );
};

export default NaviTalkDetail;
