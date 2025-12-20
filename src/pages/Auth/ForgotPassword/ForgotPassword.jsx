import { useState } from "react";
import { Link } from "react-router";
import { HiMail, HiArrowLeft } from "react-icons/hi";
import Logo from "../../../components/Logo/Logo";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleResetPassword = (data) => {
    const loadingToast = toast.loading("Sending reset link...");
    resetPassword(data.email)
      .then(() => {
        toast.dismiss(loadingToast);
        toast.success("Password reset email sent! Check your inbox.");
        setEmailSent(true);
      })
      .catch((error) => {
        toast.dismiss(loadingToast);
        if (error.code === "auth/user-not-found") {
          toast.error("No account found with this email!");
        } else if (error.code === "auth/invalid-email") {
          toast.error("Invalid email address!");
        } else {
          toast.error("Failed to send reset email. Please try again!");
        }
      });
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <Logo />
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral mb-2">
          Forgot Password?
        </h1>
        <p className="text-neutral/70">
          {emailSent
            ? "Check your email for the password reset link"
            : "Enter your email address and we'll send you a link to reset your password"}
        </p>
      </div>

      {emailSent ? (
        <div className="space-y-6">
          <div className="p-6 bg-success/10 border border-success/30 rounded-xl">
            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-success shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-semibold text-success mb-1">
                  Email Sent Successfully!
                </h3>
                <p className="text-sm text-neutral/70">
                  We've sent a password reset link to your email address. Please
                  check your inbox and follow the instructions to reset your
                  password.
                </p>
                <p className="text-sm text-neutral/60 mt-2">
                  Didn't receive the email? Check your spam folder or try again
                  in a few minutes.
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/login"
            className="flex items-center justify-center gap-2 w-full py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-primary-content transition-all duration-300"
          >
            <HiArrowLeft className="w-5 h-5" />
            Back to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-6">
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
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-3 border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-error mt-1">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-primary-content font-semibold rounded-xl hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Send Reset Link
          </button>

          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-sm text-primary hover:text-secondary transition-colors font-medium"
          >
            <HiArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </form>
      )}

      <div className="mt-8 p-4 bg-info/10 border border-info/30 rounded-xl">
        <p className="text-sm text-neutral/70 flex items-start gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-info flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <span>
            For security reasons, if an account doesn't exist with the provided
            email, no error will be shown.
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
