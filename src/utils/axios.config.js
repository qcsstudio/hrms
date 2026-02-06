// utils/axios.config.js
import axios from "axios";
import { getSlug } from "../Components/CompanySlug";

const createAxios = (token,inviteToken) => {
  const instance = axios.create({
    baseURL: "https://api.qcsstudios.com",
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    const slug = getSlug();
    const auth = config.meta?.auth; // 👈 component se aata hai

    switch (auth) {
      case "TENANT_AUTH":
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers["x-tenant"] = `https://${slug}.qcsstudios.com`;
        break;

      case "ADMIN_AUTH":
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        delete config.headers["x-tenant"];
        break;

      case "TENANT_ONLY":
        config.headers["x-tenant"] = `https://${slug}.qcsstudios.com`;
        delete config.headers.Authorization;
        break;
      case "X_TENANT_TOKEN":
        config.headers["x-invite-token"] = `${inviteToken}`;
        delete config.headers.Authorization;
        break;

      case "PUBLIC":
      default:
        delete config.headers.Authorization;
        delete config.headers["x-tenant"];
    }

    return config;
  });

  return instance;
};

export default createAxios;
