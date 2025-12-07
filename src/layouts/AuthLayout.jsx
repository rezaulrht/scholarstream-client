import { Outlet } from "react-router";
import Logo from "../components/Logo/Logo";
import authBg from "../assets/authbg.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={authBg}
            alt="University campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-neutral/85"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center p-8 lg:p-16 text-white w-full">
          <div className="mb-8 lg:mb-12 bg-white p-3 rounded-xl">
            <Logo />
          </div>

          <div className="text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">
              Your Gateway to
              <br />
              <span className="text-primary">Global Education</span>
            </h2>
            <p className="text-base lg:text-xl text-white/90 max-w-md mx-auto">
              Connect with world-class universities, discover life-changing
              scholarships, and manage your applications seamlessly.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
