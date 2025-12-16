import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  HiOutlineHome,
  HiOutlineArrowLeft,
  HiOutlineShieldExclamation,
} from "react-icons/hi2";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-base-100 to-base-200 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Shield Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.1,
          }}
          className="flex justify-center mb-8"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="text-error"
          >
            <HiOutlineShieldExclamation className="w-32 h-32 md:w-40 md:h-40" />
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-error">403</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral">
            Access Forbidden
          </h2>
          <p className="text-neutral/70 text-lg max-w-md mx-auto">
            Sorry, you don't have permission to access this page. Please contact
            your administrator if you believe this is a mistake.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline border-error text-error hover:bg-error hover:text-error-content"
          >
            <HiOutlineArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="btn bg-error text-error-content hover:bg-error/80 border-0"
          >
            <HiOutlineHome className="w-5 h-5" />
            Back to Home
          </button>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 p-6 bg-error/5 rounded-2xl border border-error/10"
        >
          <p className="text-sm text-neutral/60">
            Need help? Check out our{" "}
            <button
              onClick={() => navigate("/all-scholarships")}
              className="text-error hover:underline font-semibold"
            >
              scholarships
            </button>{" "}
            or{" "}
            <button
              onClick={() => navigate("/dashboard")}
              className="text-error hover:underline font-semibold"
            >
              dashboard
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Forbidden;
