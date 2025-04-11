import { createApi } from "@reduxjs/toolkit/query/react";

import mainAxios from "../client";

// Custom axios base query function for RTK Query
export const axiosBaseQuery =
  () =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await mainAxios({
        url,
        method,
        data,
        params,
        headers,
      });
      return { data: result };
    } catch (axiosError) {
      return {
        error: {
          status: axiosError?.status,
          data: axiosError?.data || axiosError.message,
        },
      };
    }
  };

// Create base API with shared configuration
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: ["Product", "User", "Cart"],
});
