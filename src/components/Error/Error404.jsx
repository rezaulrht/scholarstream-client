import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { HiOutlineHome, HiOutlineArrowLeft } from "react-icons/hi2";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-base-100 to-base-200 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="flex justify-center items-center gap-2 md:gap-4 mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
            className="text-8xl md:text-9xl font-bold text-primary"
          >
            4
          </motion.div>
          <motion.div
            initial={{ scale: 0, y: -100 }}
            animate={{ scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3,
            }}
            className="relative"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="text-8xl md:text-9xl font-bold text-primary"
            >
              0
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.5,
            }}
            className="text-8xl md:text-9xl font-bold text-primary"
          >
            4
          </motion.div>
        </div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-4 mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-neutral">
            Page Not Found
          </h2>
          <p className="text-neutral/70 text-lg max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off. Let's
            get you back on track.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content"
          >
            <HiOutlineArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="btn bg-primary text-primary-content hover:bg-secondary border-0"
          >
            <HiOutlineHome className="w-5 h-5" />
            Back to Home
          </button>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-12 p-6 bg-primary/5 rounded-2xl border border-primary/10"
        >
          <p className="text-sm text-neutral/60">
            Need help? Check out our{" "}
            <button
              onClick={() => navigate("/all-scholarships")}
              className="text-primary hover:underline font-semibold"
            >
              scholarships
            </button>{" "}
            or{" "}
            <button
              onClick={() => navigate("/dashboard")}
              className="text-primary hover:underline font-semibold"
            >
              dashboard
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Error404;
