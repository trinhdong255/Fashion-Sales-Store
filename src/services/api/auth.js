import { baseApi } from "./index";

import { TAG_KEYS } from "@/constants/tagKeys";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: {
          username: credentials.username,
          password: credentials.password,
        },
      }),
      invalidatesTags: [TAG_KEYS.USER],
    }),
  }),
});

export const { useLoginMutation } = authApi;
