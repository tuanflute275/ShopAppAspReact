import axios from "axios";

// Lấy token từ localStorage
const tokenLocalStorage = localStorage.getItem("token");
const token =
  tokenLocalStorage != null ? tokenLocalStorage.replaceAll('"', "") : "";

// Tạo instance Axios
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ASP,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "", // Nếu có token thì thêm vào header
  },
});

// Cập nhật baseURL nếu cần
axiosInstance.defaults.baseURL = process.env.REACT_APP_API_ASP;

// Hàm GET
export const get = async (url, config = {}) => {
  const headers = {
    ...config.headers,
    Authorization: token ? `Bearer ${token}` : "", // Nếu có token thì thêm vào header
  };

  try {
    const res = await axiosInstance.get(url, { ...config, headers });
    return res.data;
  } catch (error) {
    console.error("Error during GET request:", error);
    throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm
  }
};

// Hàm POST
export const save = async (url, data, config = {}) => {
  const headers = {
    ...config.headers,
    ...(token && { Authorization: `Bearer ${token}` }), // Chỉ thêm Authorization nếu có token
  };

  try {
    const res = await axiosInstance.post(url, data, { ...config, headers });
    return res.data;
  } catch (error) {
    console.error("Error during POST request:", error);
    throw error;
  }
};

// Hàm PUT
export const put = async (url, data, config = {}) => {
  if (!token) {
    throw new Error("No authorization token found.");
  }

  const headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };

  try {
    const res = await axiosInstance.put(url, data, { ...config, headers });
    return res.data;
  } catch (error) {
    console.error("Error during PUT request:", error);
    throw error;
  }
};

// Hàm DELETE
export const remove = async (url, config = {}) => {
  if (!token) {
    throw new Error("No authorization token found.");
  }

  const headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };

  try {
    const res = await axiosInstance.delete(url, { ...config, headers });
    return res.data;
  } catch (error) {
    console.error("Error during DELETE request:", error);
    throw error;
  }
};

export default axiosInstance;
