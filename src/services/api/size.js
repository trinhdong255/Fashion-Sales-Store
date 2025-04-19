// services/api/size.js
import { baseApi } from "/src/services/api/index.js";

export const sizeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listSizes: builder.query({
      query: (params) => {
        const { pageNo = 1, pageSize = 10, sortBy = "name-asc" } = params || {};
        return {
          url: `/v1/sizes`,
          params: { pageNo, pageSize, sortBy },
        };
      },
      providesTags: ["Sizes"],
      transformResponse: (response) => {
        // Trích xuất mảng sizes từ response.result.items, đảm bảo là mảng
        return Array.isArray(response.result?.items) ? response.result.items : [];
      },
    }),
  }),
});

export const { useListSizesQuery } = sizeApi;