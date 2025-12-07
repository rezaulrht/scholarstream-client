import { useState } from "react";
import { Link } from "react-router";
import {
  HiMail,
  HiLockClosed,
  HiEye,
  HiEyeOff,
  HiUser,
  HiCamera,
} from "react-icons/hi";
import Logo from "../../../components/Logo/Logo";
import { useForm } from "react-hook-form";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, updateUserProfile } = useAuth();

  const handleRegister = (data) => {
    console.log(data);
    const profilePic = data.photo[0];
    registerUser(data.email, data.password).then(() => {
      const imgbb_api = import.meta.env.VITE_IMGBB_API_KEY;
      const formData = new FormData();
      formData.append("image", profilePic);

      const image_api_url = `https://api.imgbb.com/1/upload?key=${imgbb_api}`;

      axios.post(image_api_url, formData).then((result) => {
        const photoURL = result.data.data.url;
        const profile = {
          displayName: data.name,
          photoURL: photoURL,
        };
        updateUserProfile(profile)
          .then(() => {
            console.log("User profile updated");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <Logo />
      </div>

      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral mb-2">
          Create Account
        </h1>
        <p className="text-sm sm:text-base text-neutral/70">
          Join thousands of students pursuing their dreams
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-4 lg:space-y-6"
      >
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
              {...register("name", { required: true })}
              placeholder="Enter your full name"
              className="w-full pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          {errors.name && (
            <p className="text-sm text-error mt-1">Name is required</p>
          )}
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
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-error mt-1">Email is required</p>
          )}
        </div>

        <div>
          <label
            htmlFor="photo"
            className="block text-sm font-medium text-neutral mb-2"
          >
            Profile Photo
          </label>
          <div className="relative">
            <HiCamera className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/50 z-10 pointer-events-none" />
            <input
              type="file"
              id="photo"
              {...register("photo")}
              accept="image/*"
              className="file-input file-input-bordered w-full pl-12 rounded-xl border-2 border-neutral/20 focus:border-primary hover:border-primary transition-colors text-sm sm:text-base"
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
              {...register("password", {
                required: true,
                minLength: 8,
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
              })}
              placeholder="Create a password"
              className="w-full pl-12 pr-12 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors"
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
          {errors.password?.type === "required" && (
            <p className="text-sm text-error mt-1">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-sm text-error mt-1">
              Password must be at least 8 characters
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-sm text-error mt-1">
              Password must include uppercase, lowercase, number, and special
              character
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2.5 sm:py-3 bg-primary text-primary-content font-semibold rounded-xl hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
        >
          Create Account
        </button>
      </form>

      <div className="my-4 lg:my-6 flex items-center gap-4">
        <div className="flex-1 h-px bg-neutral/20"></div>
        <span className="text-sm text-neutral/60">or</span>
        <div className="flex-1 h-px bg-neutral/20"></div>
      </div>

      <SocialLogin />

      <p className="mt-4 lg:mt-6 text-center text-neutral/70 text-sm sm:text-base">
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
