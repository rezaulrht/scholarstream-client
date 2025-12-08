import axios from "axios";
import React from "react";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
