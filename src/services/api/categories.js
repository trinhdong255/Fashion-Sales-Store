// services/api/categories.js
import { baseApi } from "./index";
import { TAG_KEYS } from "@/constants/tagKeys";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listCategories: builder.query({
      query: () => ({
        url: "/v1/categories",
        method: "GET",
      }),
      transformResponse: (response) => response.result?.items || [],
      providesTags: [TAG_KEYS.CATEGORIES],
    }),
  }),
});

export const {
  useListCategoriesQuery,
} = categoryApi;
