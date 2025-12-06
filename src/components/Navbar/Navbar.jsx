import { useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={closeMenu}
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
          onClick={closeMenu}
          className={({ isActive }) =>
            `font-medium transition-colors duration-300 hover:text-primary ${
              isActive ? "text-primary" : "text-neutral"
            }`
          }
        >
          All Scholarships
        </NavLink>
      </li>
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
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-neutral hover:bg-base-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                // Close Icon
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger Icon
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
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          id="mobile-menu"
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-3 border-t border-base-300">
            {/* Mobile Nav Links */}
            <ul className="space-y-2">{navLinks}</ul>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 space-y-2 border-t border-base-300">
              <Link
                to="/login"
                onClick={closeMenu}
                className="block w-full px-6 py-2.5 text-center font-medium text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-primary-content transition-all duration-300 shadow-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="block w-full px-6 py-2.5 text-center font-medium bg-primary text-primary-content rounded-lg hover:bg-secondary hover:shadow-lg transition-all duration-300 shadow-md"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
