const ProfileForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
};

export default ProfileForm;
