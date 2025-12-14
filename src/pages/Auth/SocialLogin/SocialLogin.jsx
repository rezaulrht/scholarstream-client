import { FaGoogle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const handleGoogleLogin = () => {
    const loadingToast = toast.loading("Signing in with Google...");

    googleSignIn()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };

        axiosSecure
          .post("/users", userInfo)
          .then((res) => {
            if (
              res.data.insertedId ||
              res.data.message === "user already exists"
            ) {
              toast.dismiss(loadingToast);
              toast.success("Google login successful! Welcome!");
              navigate(location.state || "/");
            } else {
              toast.dismiss(loadingToast);
              toast.success("Google login successful!");
              navigate(location.state || "/");
            }
          })
          .catch(() => {
            toast.dismiss(loadingToast);
            toast.error("Failed to save user data. Please try again!");
          });
      })
      .catch((error) => {
        toast.dismiss(loadingToast);
        if (error.code === "auth/popup-closed-by-user") {
          toast.error("Login cancelled!");
        } else if (
          error.code === "auth/account-exists-with-different-credential"
        ) {
          toast.error("Account exists with different login method!");
        } else {
          toast.error("Google login failed. Please try again!");
        }
      });
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleGoogleLogin}
        className="w-full py-2.5 sm:py-3 border-2 border-neutral/20 rounded-xl font-medium text-neutral hover:bg-base-100 transition-all duration-300 flex items-center justify-center gap-3 text-sm sm:text-base"
      >
        <FaGoogle />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
