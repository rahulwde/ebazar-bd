import { Link, NavLink } from "react-router";
import { useState, useContext } from "react";
import { BsCart4 } from "react-icons/bs";
import { AuthContext } from "../Context/Authcontext";
import useUserRole from "../hooks/useUserRole";
import Loader from "../mainLayout/pages/Loader";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const { role, roleLoading } = useUserRole();

  if (roleLoading) return <Loader />;

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks =
    role === "admin"
      ? [
          { path: "/", name: "Home" },
          { path: "/products", name: "Products" },
          { path: "/create", name: "Create" },
          { path: "/all-orders", name: "All Orders" },
        ]
      : [
          { path: "/", name: "Home" },
          { path: "/products", name: "Products" },
          ...(user && role === "user" ? [{ path: "/my-order", name: "My Order" }] : []),
        ];

  return (
    <nav className="shadow-md sticky top-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-[#0066ff] transition duration-300"
        >
          <BsCart4 size={28} />
          <div className="leading-5 text-left font-bold text-[18px]">
            <span className="text-black">Digital</span>
            <br />
            <span>
              Bazar <span className="text-[#00aa55]">BD</span>
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Cart icon desktop */}
          {user && role === "user" && (
            <Link to="/cart" className="text-gray-700 hover:text-blue-600">
              <BsCart4 size={22} />
            </Link>
          )}

          {/* Login / Signup / Logout */}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Cart icon */}
          {user && role === "user" && (
            <Link to="/cart" className="text-gray-700 hover:text-blue-600">
              <BsCart4 size={22} />
            </Link>
          )}

          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="h-6 w-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block text-blue-600 font-semibold"
                  : "block text-gray-700 hover:text-blue-500"
              }
            >
              {link.name}
            </NavLink>
          ))}

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block w-full bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 mt-2"
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block w-full bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
