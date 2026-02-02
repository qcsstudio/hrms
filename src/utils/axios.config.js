import axios from "axios";

const getBaseURL = () => {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;

  // MAIN WEBSITE
  if (hostname === "www.qcsstudios.com") {
    return `${protocol}//api.qcsstudios.com`;
  }
  // COMPANY SUBDOMAIN WITH www
  if (hostname.startsWith("www.") && hostname.endsWith(".qcsstudios.com")) {
    const company = hostname.replace("www.", "").replace(".qcsstudios.com", "");
    return `${protocol}//${company}.qcsstudios.com`;
  }

  // COMPANY SUBDOMAIN WITHOUT www
  if (hostname.endsWith(".qcsstudios.com")) {
    return `${protocol}//${hostname}`;
  }

  // LOCAL / FALLBACK
  return "http://localhost:4000";
};

const createAxios = () => {
  const instance = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return instance;
};

export default createAxios;
// GIT_TEST_CHANGE


