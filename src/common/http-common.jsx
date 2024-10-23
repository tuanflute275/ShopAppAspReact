import axios from "axios";

let tokenLocalStorage = localStorage.getItem("token");
const token =
  tokenLocalStorage != null ? tokenLocalStorage.replaceAll('"', "") : "";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ASP,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

axiosInstance.defaults.baseURL = process.env.REACT_APP_API_ASP;

export const get = async (
  url,
  config = {
    headers: { Authorization: `Bearer ${token}` },
  }
) => {
  const res = await axiosInstance.get(url, config);
  return res.data;
};

export const save = async (url, data, config = {}) => {
  const res = await axiosInstance.post(url, data, config);
  return res.data;
};

export const put = async (url, data, config = {}) => {
  const res = await axiosInstance.put(url, data, config);
  return res.data;
};

export const remove = async (url, config = {}) => {
  const res = await axiosInstance.delete(url, config);
  return res.data;
};

export default axiosInstance;
