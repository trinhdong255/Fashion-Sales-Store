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

      if (data instanceof FormData) {
        delete config.headers["Content-Type"];
      }

      console.log("Axios request config:", config);
      console.log("Full request URL:", `${config.baseURL}${config.url}`);

      const result = await axios(config);

      if (result.status >= 400) {
        console.log("Axios response error:", result);
        console.log("Server received path:", result.data?.path || "N/A");
        return {
          error: {
            status: result.status,
            data: result.data,
          },
        };
      }

      console.log("Axios response success:", result.data);
      return { data: result.data };
    } catch (axiosError) {
      const error = {
        status: axiosError.response?.status,
        data: axiosError.response?.data || axiosError.message,
      };

      console.error("Axios error:", error);

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
    "ProductVariant",
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