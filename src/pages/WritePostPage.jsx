import { useState, Fragment, useEffect } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { ageGroups, locations, themes } from '../data/categoryData';
import { AlertError, AlertSuccess } from '../common/Alert';
import supabase from '../supabase/Client';
import UseKakaoLoader from '../components/UseKakaoLoader';

const WritePostPage = () => {
  UseKakaoLoader();
  const [marketName, setMarketName] = useState('');
  const [address, setAddress] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([null, null, null, null]);
  const [isChange, setIsChange] = useState(false);
  const [Theme, setTheme] = useState(themes[0]);
  const [Group, setGroup] = useState(ageGroups[0]);
  const [Locations, setLocations] = useState(locations[0]);
  const [file, setFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSDKReady, setIsSDKReady] = useState(false);

  // 1. SDK 초기화 완료 체크
  useEffect(() => {
    const checkSDK = setInterval(() => {
      if (window.kakao?.maps?.services) {
        setIsSDKReady(true);
        clearInterval(checkSDK);
      }
    }, 100);
    return () => clearInterval(checkSDK);
  }, []);

  // 2. SDK 방식 검색
  const handleSearch = () => {
    if (!isSDKReady) {
      AlertError('지도 서비스가 준비되지 않았습니다');
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(searchQuery, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setSearchResults(data);
      } else {
        AlertError('검색 결과가 없습니다');
        setSearchResults([]);
      }
    });
  };

  const selectAddress = (result) => {
    setAddress(result.road_address_name || result.address_name);
    setSearchResults([]);
  };

  const postImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setIsChange(true);
      setFile(file);
    }
  };

  const removeImage = (e) => {
    e.preventDefault();
    setImage(null);
    setIsChange(false);
  };

  const postMultipleImages = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const newImages = [...images];
      newImages[index] = imageUrl;
      setImages(newImages);
      setIsChange(true);
    }
  };

  const removeMultipleImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };
  const postSubmit = async (e) => {
    e.preventDefault();
    if (!address) {
      AlertError('주소를 입력해주세요');
      return;
    }

    try {
      // Supabase에서 로그인된 사용자 정보 가져오기
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();
      if (userError || !user) {
        AlertError('사용자를 찾을 수 없습니다.');
        return;
      }
      const userId = user.id;

      // 게시글 저장 후 `postId` 가져오기
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .insert([
          {
            posts_title: marketName,
            users_id: userId,
            posts_review: rating.length,
            posts_info: description,
            board_type: 'navitalk'
          }
        ])
        .select('posts_id')
        .single();

      if (postError || !postData) {
        AlertError('게시글 저장 실패');
        return;
      }

      const postId = postData.posts_id; // ✅ 여기서 postId를 가져옴
      console.log('✅ New Post ID:', postId);

      // 이미지가 있는 경우 업로드 실행
      if (file) {
        const mimeType = file.type; // 예: "image/png"
        const fileExtension = mimeType.split('/')[1].toLowerCase(); // "png"
        const sanitizedMarketName = marketName.replace(/[^a-zA-Z0-9]/g, '_'); // 특수문자 제거
        const fileName = `${Date.now()}-${sanitizedMarketName}.${fileExtension}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('posts-photos')
          .upload(`posts-photos/${fileName}`, file);

        if (uploadError) {
          console.error('Image Upload Error:', uploadError.message);
          AlertError('이미지 업로드 실패');
          return;
        }

        // Public URL 가져오기
        const { data: publicUrlData } = supabase.storage.from('posts-photos').getPublicUrl(`posts-photos/${fileName}`);
        const imageUrl = publicUrlData.publicUrl;
        console.log('✅ 저장된 이미지 URL:', imageUrl);
        // posts_location 테이블 저장
        const { error: locationError } = await supabase.from('posts_locations').insert([
          {
            posts_id: postId,
            posts_location_url: address,
            posts_location_url_name: marketName
          }
        ]);

        if (locationError) {
          console.error('❌ 장소 정보 저장 실패:', locationError.message);
          AlertError('장소 정보 저장 실패');
          return;
        }

        // `posts_photos` 테이블에 저장 (✅ postId 사용)
        const { error: insertError } = await supabase.from('posts_photos').insert([
          {
            posts_id: postId,
            posts_img_url: imageUrl
          }
        ]);

        if (insertError) {
          console.error('Image Insert Error:', insertError.message);
          AlertError('이미지 정보 저장 실패');
          return;
        }
      }

      // 태그 저장
      const tagsArray = [Theme.name, Group.name, Locations.name].filter(Boolean);
      if (tagsArray.length > 0) {
        const tagInsert = tagsArray.map((tag) => ({
          posts_id: postId,
          tag_name: tag
        }));

        const { error: tagError } = await supabase.from('posts_tag').insert(tagInsert);
        if (tagError) throw new Error('태그 저장 실패');
      }

      AlertSuccess('게시글이 등록되었습니다!');
    } catch (error) {
      console.error(error);
      AlertError('오류가 발생했습니다. 다시 실행해주세요.');
    }
  };
  return (
    <div className="w-full bg-palette4 flex flex-col justify-center items-center h-full">
      <form onSubmit={postSubmit} className="flex flex-row gap-10 bg-[#fdf9e1] p-6 rounded-xl shadow-xl">
        <section className="flex flex-col items-center">
          <label className="flex flex-col mb-4 text-palette2 font-bold text-[20px]">
            사진
            {isChange && image ? (
              <div className="relative">
                <img
                  src={image}
                  alt=""
                  className="bg-white w-[400px] h-[400px] rounded-xl bg-no-repeat bg-center"
                  onClick={() => setIsChange(false)}
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-[13px]"
                >
                  X
                </button>
              </div>
            ) : (
              <input
                type="file"
                className="bg-white cursor-pointer w-[400px] h-[400px] rounded-xl bg-no-repeat bg-center bg-[url('./assets/img-plus.png')] file:border-none file:bg-inherit file:text-transparent file:w-full file:px-0 file:cursor-pointer"
                onChange={postImage}
              />
            )}
          </label>
          <div className="flex flex-row gap-3 mt-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative w-[90px] h-[90px] cursor-pointer bg-white rounded-xl bg-[url('./assets/img-plus.png')] bg-no-repeat bg-center bg-[length:34px_34px]"
              >
                {img ? (
                  <>
                    <img
                      src={img}
                      alt={`image-${index}`}
                      className="w-full h-full object-cover rounded-xl"
                      onChange={() => setIsChange(false)}
                    />
                    <button
                      type="button"
                      onClick={() => removeMultipleImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-[13px]"
                    >
                      X
                    </button>
                  </>
                ) : (
                  <label className="w-full h-full cursor-pointer">
                    <input
                      type="file"
                      className="w-full h-full opacity-0 file:border-none file:bg-inherit file:text-transparent file:w-full file:px-0 file:cursor-pointer cursor-pointer"
                      onChange={(e) => postMultipleImages(e, index)}
                    />
                    <div className="w-full h-full bg-no-repeat bg-center bg-cover rounded-xl cursor-pointer"></div>
                  </label>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-7">
          <label className="flex flex-col">
            <span className="text-palette2 font-bold text-[20px]">가게 이름</span>
            <input
              type="text"
              className="border-4 border-white rounded-lg bg-inherit w-[450px] p-2"
              value={marketName}
              onChange={(e) => setMarketName(e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <div className="w-full max-w-sm flex flex-col items-center gap-2">
              {/* 주소 검색 입력 */}
              <div className="w-full max-w-sm flex flex-col items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="장소 검색 (예: 홍대 카페)"
                  className="border p-3 w-full text-center rounded-lg cursor-pointer"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSearch();
                    }
                  }}
                />
                <input
                  type="text"
                  value={address}
                  readOnly
                  placeholder="선택된 주소가 여기에 표시됩니다"
                  className="border p-3 w-full text-center rounded-lg bg-gray-100"
                />
                {searchResults.length > 0 && (
                  <div className="w-full mt-2 max-h-60 overflow-y-auto border rounded-lg shadow-lg">
                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="p-3 hover:bg-blue-50 cursor-pointer border-b"
                        onClick={() => selectAddress(result)}
                      >
                        <div className="font-medium">{result.place_name}</div>
                        <div className="text-sm text-gray-600">{result.road_address_name || result.address_name}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </label>
          <div className="flex flex-col">
            <span className="text-palette2 font-bold text-[20px]">태그</span>
            <div className="w-full pt-2 flex flex-row gap-5 justify-center">
              <div className=" w-40">
                <Listbox value={Theme} onChange={setTheme}>
                  <div className="relative">
                    <ListboxButton className="relative w-full border-4 border-palette5 font-bold rounded-lg bg-inherit py-2 pl-3 pr-10 text-left text-palette2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition">
                      {Theme.name}
                    </ListboxButton>
                    <Transition
                      as={Fragment}
                      enter="transition-all duration-1000 ease-in-out"
                      enterFrom="max-h-0 opacity-0"
                      enterTo="max-h-96 opacity-100"
                      leave="transition-all duration-1000 ease-in-out"
                      leaveFrom="max-h-96 opacity-100"
                      leaveTo="max-h-0 opacity-0"
                    >
                      <ListboxOptions className="absolute mt-2 w-full overflow-hidden rounded-lg bg-palette5 text-gray-600 shadow-lg">
                        {themes.map((theme) => (
                          <ListboxOption
                            key={theme.id}
                            value={theme}
                            className="cursor-pointer select-none py-2 pl-3 pr-10 hover:bg-gray-400 hover:text-palette5 transition flex items-center justify-between"
                          >
                            {theme.name}
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              <div className=" w-40">
                <Listbox value={Group} onChange={setGroup}>
                  <div className="relative">
                    <ListboxButton className="relative w-full border-4 border-palette5 font-bold rounded-lg bg-inherit py-2 pl-3 pr-10 text-left text-palette2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition">
                      {Group.name}
                    </ListboxButton>
                    <Transition
                      as={Fragment}
                      enter="transition-all duration-1000 ease-in-out"
                      enterFrom="max-h-0 opacity-0"
                      enterTo="max-h-96 opacity-100"
                      leave="transition-all duration-1000 ease-in-out"
                      leaveFrom="max-h-96 opacity-100"
                      leaveTo="max-h-0 opacity-0"
                    >
                      <ListboxOptions className="absolute mt-2 w-full overflow-hidden rounded-lg bg-palette5 text-gray-600 shadow-lg">
                        {ageGroups.map((group) => (
                          <ListboxOption
                            key={group.id}
                            value={group}
                            className="cursor-pointer select-none py-2 pl-3 pr-10 hover:bg-gray-400 hover:text-palette5 transition flex items-center justify-between"
                          >
                            {group.name}
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              {/* ------------------ */}
              <div className=" w-40">
                <Listbox value={Locations} onChange={setLocations}>
                  <div className="relative">
                    <ListboxButton className="relative w-full border-4 border-palette5 font-bold rounded-lg bg-inherit py-2 pl-3 pr-10 text-left text-palette2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition">
                      {Locations.name}
                    </ListboxButton>
                    <Transition
                      as={Fragment}
                      enter="transition-all duration-1000 ease-in-out"
                      enterFrom="max-h-0 opacity-0"
                      enterTo="max-h-96 opacity-100"
                      leave="transition-all duration-1000 ease-in-out"
                      leaveFrom="max-h-96 opacity-100"
                      leaveTo="max-h-0 opacity-0"
                    >
                      <ListboxOptions className="absolute mt-2 w-full overflow-hidden rounded-lg bg-palette5 text-gray-600 shadow-lg">
                        {locations.map((location) => (
                          <ListboxOption
                            key={location.id}
                            value={location}
                            className="cursor-pointer select-none py-2 pl-3 pr-10 hover:bg-gray-400 hover:text-palette5 transition flex items-center justify-between"
                          >
                            {location.name}
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
          </div>
          <label className="flex flex-col">
            <span className="text-palette2 font-bold text-[20px]">별점</span>
            <select
              className="bg-inherit border-white border-4 rounded-lg p-2"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="⭐">⭐</option>
              <option value="⭐⭐">⭐⭐</option>
              <option value="⭐⭐⭐">⭐⭐⭐</option>
              <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
              <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
            </select>
          </label>
          <label className="flex flex-col">
            <span className="text-palette2 font-bold text-[20px]">상세 설명</span>
            <textarea
              value={description}
              className="border-4 border-white rounded-lg bg-inherit resize-none p-2 h-32 "
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-palette5 bg-palette1 py-1 px-4 rounded-full transition hover:bg-palette2"
            >
              등록
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};
export default WritePostPage;
