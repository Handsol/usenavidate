const ProfilePage = () => {
  return (
    <>
      <div>프로필 페이지</div>
      <div>
        <p>왼쪽 구역</p>
        <div>profile</div>
        <div>여기에 록기님 인풋창 추가</div>
      </div>
      <div>
        <p>오른쪽 구역</p>
        <div>
          <label>닉네임</label>
          <input placeholder="닉네임" />
        </div>
        <div>
          <label>ID</label>
          <input placeholder="ID" />
        </div>
        <div>
          <label>password</label>
          <input placeholder="password" />
        </div>
      </div>
      <div>
        <p>아래쪽 구역</p>
        <div>document upload</div>
        <button>수정하기</button>
      </div>
    </>
  );
};

export default ProfilePage;
