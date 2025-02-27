const MyPage = () => {
  return (
    <div className=" bg-palette4 text-center text-palette6 items-center w-100 h-100 p-4">
      <div className="bg-palette1 min-w-xs text-palette5 rounded-md text-2xl">MyList</div>
      <div className="py-5">
        <section className="pt-4">
          <div className="bg-palette2 rounded-md">내가 좋아요한 게시글</div>
          <div className="pt-4">(여기에 게시글 리스트 뿌리기)</div>
        </section>
        <section className="pt-4">
          <div className="bg-palette2 rounded-md">내가 작성한 게시글</div>
          <div className="pt-4">(여기에 내 게시글 리스트 뿌리기)</div>
        </section>
      </div>
    </div>
  );
};

export default MyPage;
