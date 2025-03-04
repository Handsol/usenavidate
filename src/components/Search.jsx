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

  // 태그 클릭 시 해당 태그에 대한 검색
  const handleTagClick = (tag) => {
    navigate(`/search?q=${tag}`);
  };

  return (
    // 큰 컨테이너
    <div className="border border-red-600 flex flex-col item-center justify-center h-[230px] max-w-[1200px] mx-auto -mt-2">
      <div className="flex flex-col h-full justify-center gap-4">
        {/* 검색창 */}
        <section className="flex w-2/4 h-12 mx-auto bg-palette5 justify-between items-center px-2 rounded-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="어디 갈 지 생각도 안하고 왔단 말이야..?"
            className="w-5/6 h-12 flex justify-center items-start ml-5 text-md placeholder-[#c5c5c5] placeholder-italic placeholder:text-left outline-none"
          />
          <button onClick={handleSearch} className="pr-4 flex items-center justify-center rounded-full">
            <img src={searchIcon} alt="search" />
          </button>
        </section>
        {/* 검색어 추천 */}
        <nav className="flex items-center justify-center">
          <ul className="flex flex-row gap-8 font-semibold text-palette1 text-md">
            {['20대', '30대', '점심 식사', '전시회', '서울', '경기'].map((tag, index) => (
              <li key={index} onClick={() => handleTagClick(tag)} className="cursor-pointer hover:underline">
                # {tag}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Search;
