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
          <ul className="flex flex-row gap-3 font-semibold text-palette1 text-lg">
            {['20대', '30대', '점심 식사', '전시회', '서울', '경기'].map((tag, index) => (
              <li
                key={index}
                onClick={() => handleTagClick(tag)} // ✅ 태그 클릭 시 검색 실행
                className="cursor-pointer hover:underline"
              >
                #{tag}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Search;
