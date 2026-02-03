import axios from "axios";

/**
 * 🔹 Extract company slug from hostname
 * Examples:
 *  - abc.qcsstudios.com      → abc
 *  - www.abc.qcsstudios.com  → abc
 *  - qcsstudios.com         → null
 *  - www.qcsstudios.com     → null
 *  - localhost              → null
 */
const getSlug = () => {
  const hostname = window.location.hostname;

  // localhost = always main website
  if (hostname === "localhost") return null;

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
 * 🔹 Decide API base URL
 */
const getBaseURL = () => {
  const protocol = window.location.protocol;
  const slug = getSlug();

  // MAIN WEBSITE
  if (!slug) {
    return `${protocol}//api.qcsstudios.com`;
  }

  // TENANT WEBSITE
  return `${protocol}//${slug}.qcsstudios.com`;
};

/**
 * 🔹 Tenant information for headers
 */
const getTenantInfo = () => {
  const slug = getSlug();

  if (!slug) {
    return { isTenant: false };
  }

  return {
    isTenant: true,
    tenantUrl: `https://${slug}.qcsstudios.com`,
  };
};

/**
 * 🔹 Axios instance (FINAL)
 */
const createAxios = () => {
  const instance = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    const { isTenant, tenantUrl } = getTenantInfo();

    if (isTenant) {
      // 🏢 TENANT FLOW
      config.headers["x-tenant"] = tenantUrl;
      delete config.headers.Authorization;
    } else {
      // 🔐 MAIN WEBSITE AUTH FLOW
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  });

  return instance;
};

export default createAxios;
