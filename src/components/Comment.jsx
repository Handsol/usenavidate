const Comment = () => {
    return (
        <div className="flex flex-col mb-4 mt-5 w-[930px] text-[20px]">
            <section>
                <label className="flex flex-col w-full font-bold text-palette2 text-start mb-5">상세설명
                    <textarea className="border-4 border-white rounded-xl bg-inherit resize-none w-full h-[450px] p-2"></textarea>
                </label>
                <div className="flex flex-row gap-3 justify-end">
                    <button className="text-palette5 bg-palette1 text-[18px] px-5 rounded-full transition hover:bg-palette2" >수정</button>
                    <button className="text-palette5 bg-palette1 text-[18px] px-5 rounded-full transition hover:bg-palette2">삭제</button>
                </div>
            </section>
            <section>
                <label className="w-full text-palette2">
                    댓글
                    <div className=" border-palette5 p-3 border-4 h-[500px] rounded-xl">
                        <div className="relative w-full">
                            <input type="text" className="bg-inherit text-black w-full border-palette5 border-4 rounded-xl px-3 py-2" placeholder="댓글을 입력하세요" />
                            <button className=" absolute text-[18px] right-2 top-1/2 -translate-y-1/2 bg-palette1 text-palette5 px-6  rounded-full hover:bg-palette2 transition">입력</button>
                        </div>
                    </div>
                </label>
            </section>
        </div>
    );
};
export default Comment;