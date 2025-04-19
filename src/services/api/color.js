// services/api/color.js
import { baseApi } from "./index";

export const colorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listColors: builder.query({
      query: () => ({
        url: `/v1/colors`,
      }),
      providesTags: ["Colors"],
      transformResponse: (response) => {
        // Trích xuất mảng colors từ response.result.items, đảm bảo là mảng
        return Array.isArray(response.result?.items) ? response.result.items : [];
      },
    }),
    addColor: builder.mutation({
      query: (color) => ({
        url: `/v1/colors`,
        method: "POST",
        data: color,
      }),
      invalidatesTags: ["Colors"],
    }),
    updateColor: builder.mutation({
      query: ({ id, ...color }) => ({
        url: `/v1/colors/${id}`,
        method: "PUT",
        data: color,
      }),
      invalidatesTags: ["Colors"],
    }),
    deleteColor: builder.mutation({
      query: (id) => ({
        url: `/v1/colors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Colors"],
    }),
  }),
});

export const {
  useListColorsQuery,
  useAddColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,
} = colorApi;