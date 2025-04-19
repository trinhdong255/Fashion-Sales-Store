// services/api/index.js
import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

// Custom axios base query function for RTK Query
export const axiosBaseQuery =
  () =>
  async ({ url, method, data, params, headers }) => {
    try {
      // Lấy accessToken từ localStorage
      const token = localStorage.getItem("token");
      console.log("Access Token:", token);

      // Nếu không có token, không gọi API mà trả về lỗi ngay
      if (!token) {
        console.log("No token found, redirecting to login");
        window.location.href = "/login";
        return {
          error: {
            status: 401,
            data: { message: "Không tìm thấy token, vui lòng đăng nhập lại" },
          },
        };
      }

      const config = {
        url,
        method,
        data,
        params,
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
        baseURL: import.meta.env.VITE_API_URL,
      };

      console.log("Request Config:", config);

      const result = await axios(config);
      return { data: result.data };
    } catch (axiosError) {
      const error = {
        status: axiosError.response?.status,
        data: axiosError.response?.data || axiosError.message,
      };

      console.log("API Error:", error);

      // Xử lý lỗi 401 Unauthorized
      if (error.status === 401) {
        console.log("Unauthorized, redirecting to login");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      return { error };
    }
  };

// Create base API with shared configuration
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: ["Product", "User", "Cart", "Role", "Categories", "Color", "ProductImage"],
});