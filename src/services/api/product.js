import { baseApi } from "/src/services/api/index.js";
import { TAG_KEYS } from "/src/constants/tagKeys.js";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listProductsForUser: builder.query({
      query: () => ({
        url: `/v1/public/products`,
        method: "GET",
        params: { status: "ACTIVE" },
      }),
      providesTags: [TAG_KEYS.PRODUCT],
      transformResponse: (response) => ({
        items: Array.isArray(response.result?.items)
          ? response.result.items
          : [],
      }),
      keepUnusedDataFor: 60,
      refetchOnMountOrArgChange: true,
    }),

    searchProducts: builder.query({
      query: (params) => {
        const { q, pageNo = 1, pageSize = 10 } = params || {};
        if (!q) throw new Error("Search term is required");
        return {
          url: `/v1/public/products/search`,
          method: "GET",
          params: { q, pageNo, pageSize },
        };
      },
      providesTags: [TAG_KEYS.PRODUCT],
      keepUnusedDataFor: 60,
      refetchOnMountOrArgChange: true,
    }),

    getProductById: builder.query({
      query: (id) => {
        if (!id) throw new Error("Product ID is required");
        return {
          url: `/v1/public/products/${id}`,
          method: "GET",
        };
      },
      providesTags: [TAG_KEYS.PRODUCT],
      keepUnusedDataFor: 60,
      refetchOnMountOrArgChange: true,
    }),
  }),
});

export const {
  useListProductsForUserQuery,
  useSearchProductsQuery,
  useGetProductByIdQuery,
} = productApi;
