import { motion } from "framer-motion";
import { HiSun, HiMoon } from "react-icons/hi";
import useTheme from "../../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 bg-base-300 rounded-full p-1 transition-colors duration-300 hover:bg-base-content/10"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="flex items-center justify-center w-5 h-5 bg-primary rounded-full shadow-md"
        animate={{
          x: theme === "dark" ? 24 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {theme === "dark" ? (
          <HiMoon className="w-3 h-3 text-primary-content" />
        ) : (
          <HiSun className="w-3 h-3 text-primary-content" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
