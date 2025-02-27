import searchIcon from '../assets/searchIcon.png';

const Search = () => {
  return (
    <div className="flex flex-col gap-5 pt-8">
      {/* 검색창 */}
      <div className="flex w-[500px] h-[50px] mx-auto bg-palette5 justify-between items-center px-3 rounded-full">
        <input type="text" placeholder="어디 갈 지 생각도 안하고 왔단 말이야..?" className="flex w-[90%]" />
        <button>
          <img src={searchIcon} alt="search" />
        </button>
      </div>
      {/* 검색어 추천 */}
      <div className="flex items-center justify-center">
        <ul className="flex flex-row gap-4 font-semibold text-palette1">
          <li>#20대</li>
          <li>#2030</li>
          <li>#소개팅</li>
          <li>#맛집투어</li>
          <li>#DIY</li>
          <li>#전시회</li>
        </ul>
      </div>
    </div>
  );
};

export default Search;
