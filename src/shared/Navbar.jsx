import { NavLink } from "react-router-dom";
import DigitalClock from "../components/Digitalclock";

const Navbar = () => {
  return (
    <div className="bg-gray-800 p-4 fixed top-0 left-0 right-0 z-30 shadow-md">
      <nav className="flex justify-between items-center">
        {/* Home Button */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `w-20 text-center rounded-md px-2 py-1 text-sm font-medium transition-all duration-300 ${
              isActive
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white"
            }`
          }
        >
          Home
        </NavLink>

        {/* Digital Clock */}
        <DigitalClock />

        {/* Title */}
        <div className="text-center text-white text-xl font-semibold animate__animated animate__fadeIn">
          <h1>Contest Reminder</h1>
        </div>

        {/* Settings Button */}
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `w-24 text-center rounded-md px-2 py-1 text-sm font-medium transition-all duration-300 ${
              isActive
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white"
            }`
          }
        >
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
