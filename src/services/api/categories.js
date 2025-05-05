import { baseApi } from "./index";
import { TAG_KEYS } from "@/constants/tagKeys";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listCategoriesForUser: builder.query({
      query: () => ({
        url: "/v1/categories",
        method: "GET",
      }),
      transformResponse: (response) => {
        console.log("Raw categories response in Fashion:", response);
        return response.result?.items || [];
      },
      providesTags: [TAG_KEYS.CATEGORIES],
      // Refetch khi page mount hoặc focus 
      keepUnusedDataFor: 60,
      refetchOnMountOrArgChange: true,
    }),
  }),
});

export const {
  useListCategoriesForUserQuery,
} = categoryApi;