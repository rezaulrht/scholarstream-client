import { Link, NavLink, useNavigate } from "react-router";
import Logo from "../Logo/Logo";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6ba96a",
      cancelButtonColor: "#c97a68",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              title: "Logged Out!",
              text: "You have been successfully logged out.",
              icon: "success",
              confirmButtonColor: "#6ba96a",
              timer: 2000,
              showConfirmButton: false,
            });
            navigate("/");
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "Logout failed. Please try again.",
              icon: "error",
              confirmButtonColor: "#6ba96a",
            });
            console.error("Logout error:", error);
          });
      }
    });
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-medium transition-colors duration-300 hover:text-primary ${
              isActive ? "text-primary" : "text-neutral"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-scholarships"
          className={({ isActive }) =>
            `font-medium transition-colors duration-300 hover:text-primary ${
              isActive ? "text-primary" : "text-neutral"
            }`
          }
        >
          All Scholarships
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `font-medium transition-colors duration-300 hover:text-primary ${
                  isActive ? "text-primary" : "text-neutral"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-scholarship"
              className={({ isActive }) =>
                `font-medium transition-colors duration-300 hover:text-primary ${
                  isActive ? "text-primary" : "text-neutral"
                }`
              }
            >
              Add Scholarship
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav
      className="bg-white shadow-md sticky top-0 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left Side */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
            {/* Nav Links */}
            <ul className="flex items-center gap-6">{navLinks}</ul>
          </div>

          {/* Auth Buttons - Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full border-2 border-primary hover:border-secondary transition-all duration-300">
                    <img
                      src={user.photoURL || "https://via.placeholder.com/150"}
                      alt={user.displayName || "User"}
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-3 border border-base-300"
                >
                  <li className="menu-title">
                    <span className="text-sm font-medium text-neutral truncate">
                      {user.displayName || "User"}
                    </span>
                    <span className="text-xs text-neutral/60 truncate">
                      {user.email}
                    </span>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-error hover:bg-error/10"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-2.5 font-medium text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-primary-content transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 font-medium bg-primary text-primary-content rounded-lg hover:bg-secondary hover:shadow-lg transition-all duration-300 shadow-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <label htmlFor="mobile-drawer" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </label>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className="drawer lg:hidden">
        <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side z-50">
          <label
            htmlFor="mobile-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Mobile Nav Links */}
            <ul className="space-y-2 mb-4">{navLinks}</ul>

            {/* Mobile Auth Section */}
            <div className="pt-4 space-y-2 border-t border-base-300">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <img
                      src={user.photoURL || "https://via.placeholder.com/150"}
                      alt={user.displayName || "User"}
                      className="w-10 h-10 rounded-full border-2 border-primary object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral truncate">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-neutral/60 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline btn-error w-full"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn btn-outline btn-primary w-full"
                  >
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary w-full">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
