const SignupPage = () => {
  return (
    <div className="flex h-screen p-24 pl-60 gap-28">
      {/* 그래디언트 박스 : 반응형 너비에서는 숨김처리했습니다 */}
      <div className="hidden justify-center items-center lg:flex w-[600px] relative">
        <div className="absolute inset-0 bg-[conic-gradient(from_345deg,_#ecb3da,_#ecb0d8,_#e0a1cc,_#db9ec8,_#d18abb,_#986bb6,_#7469b6,_#8b7fce,_#b6abf7,_#d0c4ff,_#fff8f8,_#ffe6e6,_#ffd1dd,_#fabad5,_#ecb3da)]"></div>
        <div className="absolute w-96 h-96 bg-[conic-gradient(from_345deg,_#ecb3da,_#ecb0d8,_#e0a1cc,_#db9ec8,_#d18abb,_#986bb6,_#7469b6,_#8b7fce,_#b6abf7,_#d0c4ff,_#fff8f8,_#ffe6e6,_#ffd1dd,_#fabad5,_#ecb3da)] blur-3xl"></div>
        {/* 배경과 텍스트 분리 */}
        <div className="relative flex flex-col w-96 h-96">
          {/* 반투명 레이어 */}
          <div className="absolute inset-0 bg-white opacity-30"></div>
          {/* 텍스트 박스 */}
          <div className="relative z-10 flex flex-col justify-center p-10 text-white text-5xl font-bold">
            <p>Dating</p>
            <p>Route</p>
            <p>for perfect</p>
            <p className="text-palette1">Day</p>
          </div>
          <p className="flex justify-center pt-10 text-white text-3xl font-bold">useNaviDate( )</p>
        </div>
      </div>
      {/* 회원가입 폼 */}
      <div className="flex flex-col p-14 justify-between">
        <h1 className="text-palette1 text-4xl font-bold mb-10">SignUp</h1>
        <form className="flex flex-col w-[420px]">
          {/* 이메일 입력창 */}
          <div className="flex flex-col gap-3 mb-3">
            <p className="text-palette1 text-lg font-semibold">EMAIL</p>
            <input
              type="email"
              placeholder="이메일을 입력해주세요."
              className="px-4 py-2 mb-3 border-white border-4 bg-palette4 rounded-xl placeholder:text-white placeholder:font-light focus:ring-0 outline-none focus:bg-palette5 hover:bg-palette5 hover:bg-opacity-50 transition-all duration-300"
            />
          </div>
          {/* 비밀번호 입력창 */}
          <div className="flex flex-col gap-3 mb-3">
            <p className="text-palette1 text-lg font-semibold">PASSWORD</p>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              className="px-4 py-2 mb-3 border-white border-4 bg-palette4 rounded-xl placeholder:text-white placeholder:font-light focus:ring-0 outline-none focus:bg-palette5 hover:bg-palette5 hover:bg-opacity-50 transition-all duration-300"
            />
          </div>
          {/* 비밀번호 확인창 */}
          <div className="flex flex-col gap-3 mb-3">
            <p className="text-palette1 text-lg font-semibold">PASSWORD CHECK</p>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              className="px-4 py-2 mb-3 border-white border-4 bg-palette4 rounded-xl placeholder:text-white placeholder:font-light focus:ring-0 outline-none focus:bg-palette5 hover:bg-palette5 hover:bg-opacity-50 transition-all duration-300"
            />
          </div>
          {/* 닉네임 입력창 */}
          <div className="flex flex-col gap-3 mb-8">
            <p className="text-palette1 text-lg font-semibold">NICKNAME</p>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              className="px-4 py-2 mb-3 border-white border-4 bg-palette4 rounded-xl placeholder:text-white placeholder:font-light focus:ring-0 outline-none focus:bg-palette5 hover:bg-palette5 hover:bg-opacity-50 transition-all duration-300"
            />
          </div>
          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="h-12 bg-palette1 text-white text-lg font-medium py-2 rounded-xl transition-all duration-300 hover:bg-palette3"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
