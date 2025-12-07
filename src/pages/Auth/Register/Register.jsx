import { useState } from "react";
import { Link } from "react-router";
import { HiMail, HiLockClosed, HiEye, HiEyeOff, HiUser } from "react-icons/hi";
import Logo from "../../../components/Logo/Logo";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      <div className="mb-8">
        <Logo />
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral mb-2">Create Account</h1>
        <p className="text-neutral/70">
          Join thousands of students pursuing their dreams
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-neutral mb-2"
          >
            Full Name
          </label>
          <div className="relative">
            <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/50" />
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              className="w-full pl-12 pr-4 py-3 border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-neutral mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/50" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full pl-12 pr-4 py-3 border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-neutral mb-2"
          >
            Password
          </label>
          <div className="relative">
            <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/50" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Create a password"
              className="w-full pl-12 pr-12 py-3 border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral/50 hover:text-neutral transition-colors"
            >
              {showPassword ? (
                <HiEyeOff className="w-5 h-5" />
              ) : (
                <HiEye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 mt-1 rounded border-neutral/20 text-primary focus:ring-primary"
              required
            />
            <span className="text-sm text-neutral/70">
              I agree to the{" "}
              <Link
                to="/terms"
                className="text-primary hover:text-secondary transition-colors"
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-primary hover:text-secondary transition-colors"
              >
                Privacy Policy
              </Link>
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-primary text-primary-content font-semibold rounded-xl hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Create Account
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="flex-1 h-px bg-neutral/20"></div>
        <span className="text-sm text-neutral/60">or</span>
        <div className="flex-1 h-px bg-neutral/20"></div>
      </div>

      <div className="space-y-3">
        <button className="w-full py-3 border-2 border-neutral/20 rounded-xl font-medium text-neutral hover:bg-base-100 transition-all duration-300 flex items-center justify-center gap-3">
          <FaGoogle />
          Continue with Google
        </button>
      </div>

      <p className="mt-6 text-center text-neutral/70">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-primary font-semibold hover:text-secondary transition-colors"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Register;
