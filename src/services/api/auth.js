// services/api/auth.js
import { baseApi } from "./index";
import { TAG_KEYS } from "@/constants/tagKeys";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Đăng nhập
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
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          // Lưu token vào localStorage
          if (data?.token) {
            localStorage.setItem("token", data.token);
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),

    // Lấy thông tin người dùng hiện tại
    getCurrentUser: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: [TAG_KEYS.USER],
    }),

    // Cập nhật thông tin người dùng
    updateUser: builder.mutation({
      query: (id, credentials) => ({
        url: `/users/${id}`,
        method: "PUT",
        data: {
          image: credentials?.image,
          username: credentials?.username,
          firstName: credentials?.firstName,
          lastName: credentials?.lastName,
          email: credentials?.email,
          phone: credentials?.phone,
          gender: credentials?.gender,
          birthDate: {
            date: credentials?.birthDate.date,
            month: credentials?.birthDate.month,
            year: credentials?.birthDate.year,
          },
          address: credentials?.address,
        },
      }),
      invalidatesTags: [TAG_KEYS.USER],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} = authApi;