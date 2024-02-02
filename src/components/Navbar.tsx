import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const userInfo = JSON.parse(`${localStorage.getItem('userInfo')}`);
  console.log(userInfo);

  const onLogOut = () => {
    toast.loading('you are logout after 2 sec');
    setTimeout(() => {
      localStorage.removeItem('userInfo');
      location.reload();
    }, 2000);
  };
  return (
    <nav className="max-w-lg mx-auto mt-7 mb-20 bg-indigo-600 px-3 py-5 rounded-md">
      <ul className="flex items-center justify-between">
        <li className="text-white duration-200 font-semibold text-lg">
          <NavLink to="/">Home</NavLink>
        </li>
        <p className="flex items-center space-x-3">
          {userInfo ? (
            <>
              <li className="text-white duration-200 font-semibold text-lg">
                <NavLink to="/profile">{userInfo.user.username}</NavLink>
              </li>
              <li className="text-white duration-200 font-semibold text-lg">
                <a className="cursor-pointer" onClick={onLogOut}>
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="text-white duration-200 font-semibold text-lg">
                <NavLink to="/login">Login</NavLink>
              </li>
              <li className="text-white duration-200 font-semibold text-lg">
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          )}
        </p>
      </ul>
    </nav>
  );
};

export default Navbar;
