import { baseApi } from "./index";
import { TAG_KEYS } from "/src/constants/tagKeys.js";

export const roleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listRoles: builder.query({
      query: () => ({
        url: "/v1/roles",
        method: "GET",
      }),
      providesTags: [TAG_KEYS.USER],
    }),

    getRoleById: builder.query({
      query: (id) => ({
        url: `/v1/roles/${id}`,
        method: "GET",
      }),
      providesTags: [TAG_KEYS.USER],
    }),

    // getCurrentUser: builder.query({
    //   query: () => ({
    //     url: "/auth/me",
    //     method: "GET",
    //   }),
    //   providesTags: [TAG_KEYS.USER],
    // }),
  }),
});

export const { useListRolesQuery, useGetRoleByIdQuery } = roleApi;
