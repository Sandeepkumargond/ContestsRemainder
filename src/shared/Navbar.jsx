import { NavLink } from "react-router-dom";


const Navbar = () => {
  return (
    <div className="bg-gray-800 p-4 fixed top-0 left-0 right-0 z-30">
      <nav className="flex justify-between items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "filter-invert brightness-200"
              : "filter-invert brightness-80"
          }
        >
          <div className="navbar-right">
            <h6 className="w-14 text-center rounded-sm text-white bg-blue-600 h-7">Home</h6>
          </div>
        </NavLink>

        <div className="text-center text-white text-xl font-semibold animate__animated animate__fadeIn">
          <h1>Contest Remainder</h1>          
        </div>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "filter-invert brightness-200"
              : "filter-invert brightness-80"
          }
        >
          <div className="navbar-left">
          <h6 className="w-16 text-center rounded-sm text-white bg-blue-600 h-7">Settings</h6>

          </div>
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
