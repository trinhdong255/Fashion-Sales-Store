// services/api/index.js
import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const axiosBaseQuery =
  () =>
  async ({ url, method, data, params, headers }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
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

      const result = await axios(config);

      if (result.status >= 400) {
        return {
          error: {
            status: result.status,
            data: result.data,
          },
        };
      }

      return { data: result.data };
    } catch (axiosError) {
      const error = {
        status: axiosError.response?.status,
        data: axiosError.response?.data || axiosError.message,
      };

      if (error.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      return { error };
    }
  };

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: [
    "User",
    "Product",
    "ProductImage",
    "Color",
    "Size",
    "Cart",
    "Role",
    "Categories",
    "Ward",
    "District",
    "Province",
    "Order",
    "OrderItem",
    "Promotion",
  ],
});
