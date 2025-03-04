import { Link } from 'react-router-dom';

const ProtectRoute = ({ to, children }) => {
  const session = JSON.parse(localStorage.getItem('session'));

  return session ? <Link to={to}>{children}</Link> : <Link to="/login">{children}</Link>;
};

export default ProtectRoute;
