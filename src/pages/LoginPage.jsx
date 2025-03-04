import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { PATH } from '../shared/PATH';
import supabase from '../supabase/Client';
import { useForm } from 'react-hook-form';
import { AlertError, AlertSuccess } from '../common/Alert';
import useAuthStore from '../zustand/AuthStore';

const LoginPage = () => {
  const navigate = useNavigate();
  // zustand authstore의 set 꺼내오기
  const userLogin = useAuthStore((state) => state.userLogin);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // 로그인 함수
  const onSubmit = async (data) => {
    const { email, password } = data;

    const { data: loginData, error } = await supabase.auth.signInWithPassword({ email, password });

    // console.log(loginData);
    userLogin(data);
    if (error) {
      AlertError('로그인 실패!', error.message);
      return;
    }

    AlertSuccess('로그인 성공!', '안녕하세요! 어디로 가볼까요?');

    // 로그인한 사용자 정보 local에 저장
    // const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    // if (sessionError) {
    //   AlertError('사용자 정보 오류', sessionError.message);
    //   return;
    // }

    // localStorage.setItem('session', JSON.stringify(sessionData.session));

    // 로그인시 HOME 화면으로 이동
    navigate('/');
  };

  return (
    <div className="flex justify-center h-screen p-20 pt-36 gap-14">
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

      {/* 로그인 폼 */}
      <div className="flex flex-col p-16 justify-between">
        <h1 className="text-palette1 text-4xl font-bold">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[420px]">
          {/* 이메일 입력창 */}
          <div className="flex flex-col gap-3 mb-8">
            <p className="text-palette1 text-lg font-semibold">EMAIL</p>
            <input
              type="email"
              placeholder="이메일을 입력해주세요."
              className="px-4 py-2 border-white border-4 bg-palette4 rounded-xl placeholder:text-white placeholder:font-light focus:ring-0 outline-none focus:bg-palette5 hover:bg-palette5 hover:bg-opacity-50 transition-all duration-300"
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '올바른 이메일 형식이 아닙니다.'
                }
              })}
            />
            {errors.email && <p className="text-palette8 text-sm -mt-3">{errors.email.message}</p>}
          </div>

          {/* 비밀번호 입력창 */}
          <div className="flex flex-col gap-3 mb-14">
            <p className="text-palette1 text-lg font-semibold">PASSWORD</p>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              className="px-4 py-2 border-white border-4 bg-palette4 rounded-xl placeholder:text-white placeholder:font-light focus:ring-0 outline-none focus:bg-palette5 hover:bg-palette5 hover:bg-opacity-50 transition-all duration-300"
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                minLength: {
                  value: 8,
                  message: '비밀번호는 8자리 이상이어야 합니다.'
                }
              })}
            />
            {errors.password && <p className="text-palette8 text-sm -mt-3">{errors.email.message}</p>}
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="h-12 bg-palette1 text-white text-lg font-medium py-2 rounded-xl transition-all duration-300 hover:bg-palette3"
          >
            Login
          </button>

          {/* 회원가입으로 이동 */}
          <div className="flex gap-8 mt-6 justify-center items-center">
            <p className="text-palette1 text-md">계정이 없으신가요?</p>
            <Link
              to={PATH.SIGNUP}
              className="h-8 flex justify-center items-center bg-palette1 text-white text-sm font-medium px-3 rounded-2xl transition-all duration-300 hover:bg-palette3"
            >
              Sign Up
            </Link>
          </div>

          {/* 소셜 로그인 버튼 */}
          <button
            type="submit"
            className="flex justify-center items-center gap-2 mt-16 h-12 bg-palette5 text-palette6 font-semibold py-2 rounded-xl transition-all duration-300 hover:bg-palette3 hover:text-palette5"
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
