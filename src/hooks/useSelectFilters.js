import { useState } from 'react';
// 코드 중복 및 옵션 데이터의 일관성 유지를 위한 훅
//
// 공통 필터 옵션
export const ageOptions = ['10대', '20대', '30대', '40대', '50대 이상'];
export const relationOptions = ['가족', '친구', '연인', '썸', '첫만남', '부부'];
export const regionOptions = [
  '서울시',
  '경기도',
  '인천시',
  '부산시',
  '대전시',
  '대구시',
  '울산시',
  '세종시',
  '광주시',
  '강원도',
  '충청북도',
  '충청남도',
  '경상북도',
  '경상남도',
  '전라북도',
  '전라남도',
  '제주도'
];
export const costOptions = ['1~3만원', '3~5만원', '5~10만원', '10~20만원', '20~30만원', '30만원 이상'];

// 커스텀 훅 (모든 필터 상태)
const useSelectFilters = () => {
  const [selectedAge, setSelectedAge] = useState(ageOptions[0]);
  const [selectedRelation, setSelectedRelation] = useState(relationOptions[0]);
  const [selectedRegion, setSelectedRegion] = useState(regionOptions[0]);
  const [selectedCost, setSelectedCost] = useState(costOptions[0]);
  // 선택값과 그 값을 업데이트할 수 있는 함수 반환하기
  return {
    selectedAge,
    setSelectedAge,
    selectedRelation,
    setSelectedRelation,
    selectedRegion,
    setSelectedRegion,
    selectedCost,
    setSelectedCost
  };
};

export default useSelectFilters;
