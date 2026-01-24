import { Toaster } from "react-hot-toast";
import useTheme from "../../hooks/useTheme";

const ThemedToaster = () => {
  const { isDark } = useTheme();

  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: isDark ? "#252520" : "#fff",
          color: isDark ? "#e8e7e0" : "#363636",
          border: isDark ? "1px solid #2f2f28" : "1px solid #f5f4f0",
        },
        success: {
          iconTheme: {
            primary: isDark ? "#7dba7c" : "#6ba96a",
            secondary: isDark ? "#1a1a16" : "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: isDark ? "#d68b78" : "#c97a68",
            secondary: isDark ? "#1a1a16" : "#fff",
          },
        },
      }}
    />
  );
};

export default ThemedToaster;
