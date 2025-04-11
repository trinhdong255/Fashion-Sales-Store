import { baseApi } from "/src/services/api/index.js";
// import { TAG_KEYS } from "/src/constants/tagKeys.js?t=1744269010633&t=1744269010633";
import { TAG_KEYS } from "/src/constants/tagKeys.js";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listProducts: builder.query({
      query: (params) => {
        // Kiểm tra params, nếu không tồn tại thì dùng giá trị mặc định
        const { skip = 0, limit = 20 } = params || {};
        return {
          url: `/products?limit=${limit}&skip=${skip}`,
        };
      },
      providesTags: [TAG_KEYS.PRODUCT],
    }),
    getProductById: builder.query({
      query: (id) => {
        if (!id) {
          throw new Error("Product ID is required");
        }
        return {
          url: `/products/${id}`,
        };
      },
      providesTags: [TAG_KEYS.PRODUCT],
    }),
  }),
});

export const { useListProductsQuery, useGetProductByIdQuery } = productApi;