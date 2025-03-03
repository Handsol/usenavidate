import { Listbox } from '@headlessui/react';
// 동일한 UI를 사용하기 위한 컴포넌트
const CustomSelect = ({ label, options, selected, setSelected }) => {
  // Label : 제목
  // options : 선택 가능한 옵션 배열
  // selected : 현재 선택된 값
  // setSelected : 선택값 업데이트
  return (
    <div className="w-full mb-4">
      {/* 제목 */}
      <label className="block text-lg font-medium text-gray-700 mb-1">{label}</label>
      {/* Headless UI ListBox 컴포넌트 사용해 셀렉트 */}
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="w-full py-2 px-4 text-left bg-white border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            {selected}
          </Listbox.Button>
          <Listbox.Options className="absolute w-full bg-white border rounded-lg shadow-lg mt-2 z-10">
            {options.map((option, index) => (
              <Listbox.Option key={index} value={option} className="cursor-pointer py-2 px-4 hover:bg-blue-100">
                {option}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomSelect;
