import { useState } from 'react';

export const themes = [
  { id: 1, name: '영화' },
  { id: 2, name: '운동' },
  { id: 3, name: '전시회' },
  { id: 4, name: '방탈출' },
  { id: 5, name: '술약속' },
  { id: 6, name: '점심 식사' },
  { id: 7, name: '저녁 식사' },
  { id: 8, name: '야구 관람' },
  { id: 9, name: '자전거 여행' }
];

export const ageGroups = [
  { id: 1, name: '10대' },
  { id: 2, name: '20대' },
  { id: 3, name: '30대' },
  { id: 4, name: '40대' },
  { id: 5, name: '50대' }
];

export const locations = [
  { id: 1, name: '서울' },
  { id: 2, name: '경기' },
  { id: 3, name: '인천' },
  { id: 4, name: '부산' },
  { id: 5, name: '대전' },
  { id: 6, name: '대구' },
  { id: 7, name: '울산' },
  { id: 8, name: '세종' },
  { id: 9, name: '광주' },
  { id: 10, name: '강원' },
  { id: 11, name: '충북' },
  { id: 12, name: '충남' },
  { id: 13, name: '경북' },
  { id: 14, name: '경남' },
  { id: 15, name: '전북' },
  { id: 16, name: '전남' },
  { id: 17, name: '제주' }
];
export const relations = [
  { id: 1, name: '가족' },
  { id: 2, name: '친구' },
  { id: 3, name: '연인' },
  { id: 4, name: '썸' },
  { id: 5, name: '첫만남' },
  { id: 6, name: '부부' }
];

export const costOptions = [
  { id: 1, name: '1-3만원' },
  { id: 2, name: '3-5만원' },
  { id: 3, name: '5-10만원' },
  { id: 4, name: '10-20만원' },
  { id: 5, name: '20-30만원' },
  { id: 6, name: '30만원 이상' }
];

const useSelectFilters = () => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(ageGroups[0]);
  const [selectedRelation, setSelectedRelation] = useState(relations[0]);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [selectedCost, setSelectedCost] = useState(costOptions[0]);

  return {
    selectedAgeGroup,
    setSelectedAgeGroup,
    selectedRelation,
    setSelectedRelation,
    selectedLocation,
    setSelectedLocation,
    selectedCost,
    setSelectedCost
  };
};

export default useSelectFilters;
