import Router from './shared/Router';
import useAuthStore from './zustand/AuthStore';

const App = () => {
  // store에서 값을 꺼내서 사용
  // const userData = useAuthStore((state) => state.user);
  // const userLogin = useAuthStore((state) => state.userLogin);
  // const userLogout = useAuthStore((state) => state.userLogout);

  return (
    <>
      <Router />
    </>
  );
};

export default App;
