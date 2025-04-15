// services/api/auth.js
import { baseApi } from "./index";
import { TAG_KEYS } from "@/constants/tagKeys";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Đăng nhập
    login: builder.mutation({
      query: (credentials) => ({
        url: "/v1/auth/login",
        method: "POST",
        data: {
          email: credentials.email,
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

    // Đăng ký
    register: builder.mutation({
      query: (credentials) => ({
        url: "/v1/auth/register",
        method: "POST",
        data: {
          name: credentials.name,
          email: credentials.email,
          phone: credentials.phone,
          password: credentials.password,
          confirmPassword: credentials.confirmPassword,
        },
      }),
      invalidatesTags: [TAG_KEYS.USER],
    }),

    // Verify-OTP
    verifyOtp: builder.mutation({
      query: (credentials) => ({
        url: "/v1/auth/register/verify",
        method: "POST",
        data: {
          email: credentials.email,
          verificationCode: credentials.verificationCode,
        },
      }),
      invalidatesTags: [TAG_KEYS.USER],
    }),

    // Quên mật khẩu
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: "/v1/auth/forgot-password",
        method: "POST",
        data: {
          email: credentials.email,
        },
      }),
      invalidatesTags: [TAG_KEYS.USER],
    }),

    // Xác thực mật khẩu
    forgotPasswordVerify: builder.mutation({
      query: (credentials) => ({
        url: "/v1/auth/forgot-password/verify-code",
        method: "POST",
        data: {
          email: credentials.email,
          verificationCode: credentials.verificationCode,
        },
      }),
      invalidatesTags: [TAG_KEYS.USER],
    }),

    // Đặt lại mật khẩu
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/v1/auth/forgot-password/reset-password",
        method: "POST",
        data: {
          forgotPasswordToken: credentials.forgotPasswordToken,
          newPassword: credentials.newPassword,
          confirmPassword: credentials.confirmPassword,
        },
      }),
      invalidatesTags: [TAG_KEYS.USER],
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
  useRegisterMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useForgotPasswordVerifyMutation,
  useResetPasswordMutation,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} = authApi;
