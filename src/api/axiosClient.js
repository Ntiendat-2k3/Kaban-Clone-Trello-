import axios from "axios";
import { API_URL } from "../config/constants";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("[axiosClient]", err?.response || err);
    return Promise.reject(err);
  }
);

export default axiosClient;
