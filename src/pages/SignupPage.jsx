import { useForm } from 'react-hook-form';
import supabase from '../supabase/Client';
import { AlertError, AlertInfo, AlertSuccess } from '../common/Alert';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  // password 실시간 감시
  const password = watch('password');

  // SignUp 함수
  const onSubmit = async (data) => {
    const { email, password, nickname } = data;

    // db(supabase) 에 회원가입 요청
    const { data: signUpData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname
        }
      }
    });

    if (error) {
      switch (error.message) {
        case 'email_exists':
        case 'user_already_exists':
          AlertInfo('잠깐!', '이미 사용 중인 이메일입니다.');
          return;
        case 'weak_password':
          AlertError('경고', '비밀번호는 최소 8자리 이상이어야 합니다.');
          return;
        case 'invalid_email':
          AlertError('경고', '올바른 이메일 형식이 아닙니다.');
          return;
        default:
          AlertError('회원가입 실패!', `${error.message}`);
          return;
      }
    }

    // 회원가입 성공 알림
    AlertSuccess('회원가입 성공!', '축하합니다! 어디로 가볼까요?');

    // 로그인된 사용자 정보 local에 저장
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      AlertError('사용자 정보 오류', sessionError.message);
      return;
    }

    localStorage.setItem('session', JSON.stringify(sessionData.session));

    // 회원가입 성공 시 홈 화면으로 이동
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

      {/* 회원가입 폼 */}
      <div className="flex flex-col p-14 justify-between">
        <h1 className="text-palette1 text-4xl font-bold mb-10">SignUp</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[420px]">
          {/* 이메일 입력창 */}
          <div className="flex flex-col gap-3 mb-3">
            <p className="text-palette1 text-lg font-semibold">EMAIL</p>
            <input
              type="email"
              placeholder="이메일을 입력해주세요."
              className="px-4 py-2 mb-3 border-white border-4 bg-palette4 rounded-xl placeholder:text-white placeholder:font-light focus:ring-0 outline-none focus:bg-palette5 hover:bg-palette5 hover:bg-opacity-50 transition-all duration-300"
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
          <div className="flex flex-col gap-3 mb-3">
            <p className="text-palette1 text-lg font-semibold">PASSWORD</p>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              className="px-4 py-2 mb-3 border-white border-4 bg-palette4 rounded-xl placeholder:text-white placeholder:font-light focus:ring-0 outline-none focus:bg-palette5 hover:bg-palette5 hover:bg-opacity-50 transition-all duration-300"
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                minLength: {
                  value: 8,
                  message: '비밀번호는 최소 8자 이상이어야 합니다.'
                }
              })}
            />
            {errors.password && <p className="text-palette8 text-sm -mt-3">{errors.password.message}</p>}
          </div>

          {/* 비밀번호 확인창 */}
          <div className="flex flex-col gap-3 mb-3">
            <p className="text-palette1 text-lg font-semibold">PASSWORD CHECK</p>
            <input
              type="password"
              placeholder="다시 한 번 입력해주세요."
              className="px-4 py-2 mb-3 border-white border-4 bg-palette4 rounded-xl placeholder:text-white placeholder:font-light focus:ring-0 outline-none focus:bg-palette5 hover:bg-palette5 hover:bg-opacity-50 transition-all duration-300"
              {...register('passwordCheck', {
                required: '비밀번호 확인을 입력해주세요.',
                validate: (value) => value === password || '비밀번호가 일치하지 않습니다.'
              })}
            />
            {errors.passwordCheck && <p className="text-palette8 text-sm -mt-3">{errors.passwordCheck.message}</p>}
          </div>

          {/* 닉네임 입력창 */}
          <div className="flex flex-col gap-3 mb-8">
            <p className="text-palette1 text-lg font-semibold">NICKNAME</p>
            <input
              type="text"
              placeholder="닉네임을 입력해주세요."
              className="px-4 py-2 mb-3 border-white border-4 bg-palette4 rounded-xl placeholder:text-white placeholder:font-light focus:ring-0 outline-none focus:bg-palette5 hover:bg-palette5 hover:bg-opacity-50 transition-all duration-300"
              {...register('nickname')}
            />
            {errors.nickname && <p className="text-palette8 text-sm -mt-3">{errors.nickname.message}</p>}
          </div>

          {/* 회원가입 버튼 */}
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
