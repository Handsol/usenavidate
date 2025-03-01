import Router from './shared/Router';
import useAuthStore from './zustand/AuthStore';

const App = () => {
  const userData = useAuthStore((state) => state.user);
  const userLogin = useAuthStore((state) => state.userLogin);
  const userLogout = useAuthStore((state) => state.userLogout);

  return (
    <div>
      <Router />
    </div>
  );
};

export default App;
