const ProfilePage = () => {
  return (
    <>
      <div className="flex flex-row justify-center pt-5">
        <div className="flex flex-grow-0 bg-palette1 w-fit text-palette5 text-2xl font-bold rounded-full px-8 py-2">
          Profile
        </div>
      </div>
      <div className="flex flex-row justify-center text-left w-full pt-5 px-40">
        <div className="flex flex-col text-center text-palette6 w-full p-4">
          <p className="text-left text-palette1 text-1xl font-semibold">Profile</p>
          {/* 여기에 록기님 인풋창 추가 */}
          <div className="flex flex-shrink-0 bg-palette5 w-10% min-h-52 p-1 rounded-2xl mt-5" />
        </div>
        <div className="flex flex-col text- text-palette6 w-full p-4">
          <div className="flex flex-col gap-3">
            <label className="text-palette1 text-1xl font-semibold">Nickname</label>
            <input
              type="text"
              className="border-4 border-white rounded-lg bg-inherit w-20% p-2 placeholder-palette2"
              placeholder="닉네임"
            />
            <label className="text-palette1 text-1xl font-semibold">ID</label>
            <input
              type="text"
              className="border-4 border-white rounded-lg bg-inherit w-20% p-2 placeholder-palette2"
              placeholder="ID"
            />
            <label className="text-palette1 text-1xl font-semibold">password</label>
            <input
              type="text"
              className="border-4 border-white rounded-lg bg-inherit w-20% p-2 placeholder-palette2"
              placeholder="password"
            />
          </div>
          <button className="text-center bg-palette1 text-palette5 items-center w-full rounded-full px-20 py-2 mt-20">
            수정하기
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
