import axios from "axios";

/**
 * 🔹 Extract tenant slug from hostname
 */
const getSlug = () => {
  const hostname = window.location.hostname;

  // localhost OR main domain
  if (
    hostname === "localhost" ||
    hostname === "qcsstudios.com" ||
    hostname === "www.qcsstudios.com"
  ) {
    return null;
  }

  const parts = hostname.split(".");

  // www.abc.qcsstudios.com
  if (parts.length === 4 && parts[0] === "www") {
    return parts[1];
  }

  // abc.qcsstudios.com
  if (parts.length === 3) {
    return parts[0];
  }

  return null;
};

/**
 * 🔹 Axios instance
 */
const createAxios = () => {
  const instance = axios.create({
    baseURL: "https://api.qcsstudios.com", // 🔥 ALWAYS SAME
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    const slug = getSlug();

    if (slug) {
      // 🏢 TENANT REQUEST
      delete config.headers.Authorization;
      config.headers["x-tenant"] = `https://${slug}.qcsstudios.com`;
    } else {
      // 🔐 MAIN WEBSITE REQUEST
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      delete config.headers["x-tenant"];
    }

    return config;
  });

  return instance;
};

export default createAxios;
