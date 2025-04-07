import { baseApi } from "./index";

import { TAG_KEYS } from "@/constants/tagKeys";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: [TAG_KEYS.PRODUCT],
    }),
  }),
});

export const { useListProductsQuery } = productApi;
