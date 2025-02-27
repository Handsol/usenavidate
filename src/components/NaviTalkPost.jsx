const NaviTalkPost = () => {
  return (
    <div className="relative h-[250px] rounded-3xl overflow-hidden">
      <img
        className="absolute inset-0 w-full h-full object-cover items-center"
        src="../assets/sampleImage.jpg"
        alt="이미지"
      />
      <section className="absolute bottom-0 w-full h-[100px] flex-col gap-3 bg-palette5">
        <div className="flex flex-row w-full h-[50%] items-center justify-between px-2">
          <div className="flex w-full text-2xl font-semibold truncate">제목이 너무 길어지면 이렇게 자동으로 잘려용</div>
          <div className="flex text-xl font-medium flex-shrink-0">⭐3</div>
        </div>
        <div className="flex flex-row w-full h-[50%] items-center justify-between px-2">
          <div className="flex w-full text-lg truncate">
            <ul className="flex flex-row gap-2">
              <li>20대 & </li>
              <li>데이트 & </li>
              <li>서울숲</li>
            </ul>
          </div>
          <div className="flex text-lg font-semibold flex-shrink-0">맛집좋아</div>
        </div>
      </section>
    </div>
  );
};

export default NaviTalkPost;
