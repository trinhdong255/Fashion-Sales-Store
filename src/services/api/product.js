// productApi.js
import { baseApi } from "/src/services/api/index.js";
import { TAG_KEYS } from "/src/constants/tagKeys.js";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listProducts: builder.query({
      query: (params) => {
        const { skip = 0, limit = 20 } = params || {};
        return {
          url: `/v1/products?limit=${limit}&skip=${skip}`,
        };
      },
      providesTags: [TAG_KEYS.PRODUCT],
      // Refetch khi tham số query thay đổi
      keepUnusedDataFor: 60, // Giữ dữ liệu trong cache 60 giây
      refetchOnMountOrArgChange: true, // Refetch khi tham số thay đổi
    }),

    searchProducts: builder.query({
      query: (params) => {
        const { q, skip = 0, limit = 20 } = params || {};
        if (!q) {
          throw new Error("Search term is required");
        }
        return {
          url: `/v1/products/search?q=${q}&limit=${limit}&skip=${skip}`,
        };
      },
      providesTags: [TAG_KEYS.PRODUCT],
      keepUnusedDataFor: 60,
      refetchOnMountOrArgChange: true,
    }),
    
    getProductById: builder.query({
      query: (id) => {
        if (!id) {
          throw new Error("Product ID is required");
        }
        return {
          url: `/v1/products/${id}`,
        };
      },
      providesTags: [TAG_KEYS.PRODUCT],
      keepUnusedDataFor: 60,
      refetchOnMountOrArgChange: true,
    }),
  }),
});

export const {
  useListProductsQuery,
  useSearchProductsQuery,
  useGetProductByIdQuery,
} = productApi;