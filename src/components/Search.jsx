import searchIcon from '../assets/searchIcon.png';

const Search = () => {
  return (
    // 큰 컨테이너
    <div className="flex item-center justify-center h-[250px] max-w-[1300px] mx-auto">
      <div className="flex flex-col h-full justify-center gap-4">
        {/* 검색창 */}
        <section className="flex w-[500px] h-[70px] mx-auto bg-palette5 justify-between items-center px-3 rounded-full">
          <input
            type="text"
            placeholder="어디 갈 지 생각도 안하고 왔단 말이야..?"
            className="flex h-[70%] w-[80%] ml-5 text-lg data-[focus]: outline-none"
          />
          <button className="flex items-center justify-center w-[70px] h-[70px] rounded-full">
            <img src={searchIcon} alt="search" />
          </button>
        </section>
        {/* 검색어 추천 */}
        <nav className="flex items-center justify-center">
          <ul className="flex flex-row gap-4 font-semibold text-palette1 text-lg">
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
