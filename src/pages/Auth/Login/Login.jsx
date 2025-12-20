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
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { signInUser } = useAuth();

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
