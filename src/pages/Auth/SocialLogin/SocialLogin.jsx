import { FaGoogle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        console.log("Google login successful:", result.user);
      })
      .catch((error) => {
        console.error("Google login error:", error);
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
