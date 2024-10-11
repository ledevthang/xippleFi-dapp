import axios from "axios";
import secureStorage from "./secureStorage";
import { SECURE_SROGARE } from "@/types";

const accessToken = secureStorage
  .getItem(SECURE_SROGARE.ACCESS_TOKEN)
  ?.replace(/^"(.*)"$/, "$1");

const AXIOS = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_END_POINT,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

AXIOS.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${accessToken}`;
  return config;
});

AXIOS.interceptors.response.use(
  (res) => {
    return res.data;
  },
  async (err) => {
    const originalRequest = err.config;
    if (
      err.response &&
      err.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        AXIOS.defaults.headers.common["Authorization"] =
          `Bearer ${accessToken}`;
        return AXIOS(originalRequest);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e: unknown) {
        window.location.replace("/");
      }
    }
    return Promise.reject(err);
  },
);

export default AXIOS;
