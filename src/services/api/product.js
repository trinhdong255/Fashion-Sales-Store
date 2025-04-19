// services/api/product.js
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
      keepUnusedDataFor: 60,
      refetchOnMountOrArgChange: true,
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

    addProduct: builder.mutation({
      query: (product) => ({
        url: `/v1/products`,
        method: "POST",
        data: {
          name: product.name,
          description: product.description,
          categoryId: product.categoryId,
          status: product.status,
          price: product.price, // Giá chung cho sản phẩm
          quantity: product.quantity, // Số lượng chung cho sản phẩm
          colorIds: product.colorIds, // Mảng colorId
          sizeIds: product.sizeIds, // Mảng sizeId
          imageIds: product.imageIds, // Mảng imageId
        },
      }),
      invalidatesTags: [TAG_KEYS.PRODUCT],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...product }) => ({
        url: `/v1/products/${id}`,
        method: "PUT",
        data: {
          name: product.name,
          description: product.description,
          categoryId: product.categoryId,
          status: product.status,
          price: product.price,
          quantity: product.quantity,
          colorIds: product.colorIds,
          sizeIds: product.sizeIds,
          imageIds: product.imageIds,
        },
      }),
      invalidatesTags: [TAG_KEYS.PRODUCT],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/v1/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_KEYS.PRODUCT],
    }),
  }),
});

export const {
  useListProductsQuery,
  useSearchProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;