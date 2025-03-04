import { useState } from 'react';
import searchIcon from '../assets/searchIcon.png';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  return (
    // 큰 컨테이너
    <div className="flex item-center justify-center h-[250px] max-w-[1300px] mx-auto">
      <div className="flex flex-col h-full justify-center gap-4">
        {/* 검색창 */}
        <section className="flex w-[500px] h-[55px] mx-auto bg-palette5 justify-between items-center px-3 rounded-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="어디 갈 지 생각도 안하고 왔단 말이야..?"
            className="flex h-[70%] w-[80%] ml-5 text-lg data-[focus]: outline-none"
          />
          <button onClick={handleSearch} className="flex items-center justify-center w-[70px] h-[70px] rounded-full">
            <img src={searchIcon} alt="search" />
          </button>
        </section>
        {/* 검색어 추천 */}
        <nav className="flex items-center justify-center gap-4">
          <p className="flex flex-row font-semibold text-palette1 text-lg cursor-default">추천 검색어 :</p>
          <ul className="flex flex-row gap-3 font-semibold text-palette1 text-lg cursor-pointer">
            <li>#20대</li>
            <li>#30대</li>
            <li>#점심 식사</li>
            <li>#전시회</li>
            <li>#서울</li>
            <li>#경기</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Search;
