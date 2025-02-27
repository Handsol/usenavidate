import searchIcon from '../assets/searchIcon.png';

const Search = () => {
  return (
    // 큰 컨테이너
    <div className="flex item-center justify-center h-[150px]">
      <div className="flex flex-col h-full justify-center gap-5">
        {/* 검색창 */}
        <section className="flex w-[500px] h-[50px] mx-auto bg-palette5 justify-between items-center px-3 rounded-full">
          <input type="text" placeholder="어디 갈 지 생각도 안하고 왔단 말이야..?" className="flex w-[90%]" />
          <button>
            <img src={searchIcon} alt="search" />
          </button>
        </section>
        {/* 검색어 추천 */}
        <nav className="flex items-center justify-center">
          <ul className="flex flex-row gap-4 font-semibold text-palette1">
            <li>#20대</li>
            <li>#2030</li>
            <li>#소개팅</li>
            <li>#맛집투어</li>
            <li>#DIY</li>
            <li>#전시회</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Search;
