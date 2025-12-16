import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200">
      <div className="text-center">
        {/* Spinning Logo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-24 h-24 mx-auto mb-6"
        >
          <img
            src="/logo.png"
            alt="Loading..."
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-neutral mb-2">
            <span className="text-primary">Scholar</span>
            <span className="text-secondary">Stream</span>
          </h2>
          <div className="flex items-center justify-center gap-2">
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-neutral/60"
            >
              Loading
            </motion.span>
            <motion.div className="flex gap-1">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0,
                }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
              >
                .
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
