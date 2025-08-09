import { Link } from "react-router";
import { FiLogOut } from "react-icons/fi";
import Logo from "/Logo.png"
import NavItem from "./NavItem";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  const { user, logout } = useAuth();
  

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      toast.error("Logout failed", err);
    }
  };

  const navLinks = (
    <>
      <li>
        <NavItem to="/" end>
          Home
        </NavItem>
      </li>
      <li>
        <NavItem to="/available-foods">Available Foods</NavItem>
      </li>
      <li>
        <NavItem to="/about">About Us</NavItem>
      </li>
      <li>
        <NavItem to="/contact">Contact Us</NavItem>
      </li>
      {user && (
        <>
          <li>
            <NavItem to="/add-food">Add Food</NavItem>
          </li>
          <li>
            <NavItem to="/manage-foods">Manage My Foods</NavItem>
          </li>
          <li>
            <NavItem to="/my-requests">My Food Request</NavItem>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="w-full bg-base-200 sticky top-0 z-50 shadow-md">

      <div className="navbar max-w-7xl mx-auto px-4">

        <div className="navbar-start">
        <Link to="/" className="text-xl font-bold text-primary">
          <img className="w-22 -mt-2 -mb-4" src={Logo} alt="" />
        </Link>
      </div>

      {/* Center: Menu Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-1">{navLinks}</ul>
      </div>

      {/* Right: Auth Buttons or Profile */}
      <div className="navbar-end space-x-3">
        <DarkModeToggle/>

        {!user ? (
          <>
            <Link to="/login" className="btn btn-outline btn-sm">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary btn-sm">
              Signup
            </Link>
          </>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="profile"
                />
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-ghost btn-circle tooltip tooltip-bottom"
              data-tip="Logout"
            >
              <FiLogOut size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden navbar-end">
        <details className="dropdown dropdown-end">
          <summary className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </summary>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
            <DarkModeToggle/>
            {!user && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            )}
            {user && (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </details>
      </div>

      </div>
      
    </nav>
  );
}
