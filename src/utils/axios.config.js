import axios from "axios"; // ------------ New

// local == http://localhost:4000
// ip address = http://13.127.109.214:4000

const createAxios = () => {
  const instance = axios.create({
    // baseURL: "http://localhost:4000",
    baseURL: "http://13.127.109.214:4000",
    // baseURL: "https://hrms.qcsstudio.com",
    withCredentials: true,
  });

  // Add token dynamically before each request
  instance.interceptors.request.use((config) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  });
  return instance;
};

export default createAxios;
