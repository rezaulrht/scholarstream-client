import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import Logo from "../../../components/Logo/Logo";
import { useForm } from "react-hook-form";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoOptions, setShowDemoOptions] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { signInUser } = useAuth();

  // Demo credentials
  const demoAccounts = {
    student: {
      email: "student@scholarstream.com",
      password: "@Student123",
    },
    moderator: {
      email: "mod@scholarstream.com",
      password: "@Mod1234",
    },
    admin: {
      email: "admin@scholarstream.com",
      password: "@Admin123",
    },
  };

  const handleDemoLogin = (role) => {
    const credentials = demoAccounts[role];
    setValue("email", credentials.email);
    setValue("password", credentials.password);
    setShowDemoOptions(false);
    toast.success(`Demo ${role} credentials loaded!`);
  };

  const handleLogin = (data) => {
    const loadingToast = toast.loading("Signing in...");
    signInUser(data.email, data.password)
      .then(() => {
        toast.dismiss(loadingToast);
        toast.success("Login successful! Welcome back!");
        navigate(location.state || "/");
      })
      .catch((error) => {
        toast.dismiss(loadingToast);
        if (error.code === "auth/invalid-credential") {
          toast.error("Invalid email or password!");
        } else if (error.code === "auth/user-not-found") {
          toast.error("No account found with this email!");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password!");
        } else {
          toast.error("Login failed. Please try again!");
        }
      });
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <Logo />
      </div>

      {location.state && (
        <div className="mb-6 p-4 bg-warning/10 border border-warning/30 rounded-xl flex items-start gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-warning shrink-0 mt-0.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm text-warning font-medium">
            Please login first to access that feature
          </p>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral mb-2">Welcome Back!</h1>
        <p className="text-neutral/70">
          Sign in to continue your scholarship journey
        </p>
      </div>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
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
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full pl-12 pr-4 py-3 border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-error mt-1">Email is required</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-neutral"
            >
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-secondary transition-colors font-medium"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/50" />
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Enter your password"
              className="w-full pl-12 pr-12 py-3 border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors"
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
          {errors.password && (
            <p className="text-sm text-error mt-1">Password is required</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-primary text-primary-content font-semibold rounded-xl hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Sign In
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="flex-1 h-px bg-neutral/20"></div>
        <span className="text-sm text-neutral/60">or</span>
        <div className="flex-1 h-px bg-neutral/20"></div>
      </div>

      <SocialLogin />

      {/* Demo Account Section */}
      <div className="mt-6">
        {!showDemoOptions ? (
          <button
            type="button"
            onClick={() => setShowDemoOptions(true)}
            className="w-full py-3 bg-white border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary/5 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Try Demo Account
          </button>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Student Demo */}
            <button
              type="button"
              onClick={() => handleDemoLogin("student")}
              className="py-3 px-4 bg-white border-2 border-primary text-primary font-medium rounded-xl hover:bg-primary hover:text-primary-content transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              Student Demo
            </button>

            {/* Moderator Demo */}
            <button
              type="button"
              onClick={() => handleDemoLogin("moderator")}
              className="py-3 px-4 bg-white border-2 border-secondary text-secondary font-medium rounded-xl hover:bg-secondary hover:text-secondary-content transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Moderator Demo
            </button>

            {/* Admin Demo */}
            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              className="py-3 px-4 bg-white border-2 border-warning text-warning font-medium rounded-xl hover:bg-warning hover:text-warning-content transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              Admin Demo
            </button>
          </div>
        )}
      </div>

      <p className="mt-6 text-center text-neutral/70">
        Don't have an account?{" "}
        <Link
          to="/register"
          state={location.state}
          className="text-primary font-semibold hover:text-secondary transition-colors"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
