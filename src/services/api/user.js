import { authApi } from "./auth";
import { baseApi } from "./index";
import { TAG_KEYS } from "@/constants/tagKeys";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: ({ id, ...credentials }) => {
        // Chuyển đổi birthDate thành định dạng YYYY-MM-DD
        const dob =
          credentials.birthDate?.year &&
          credentials.birthDate?.month &&
          credentials.birthDate?.date
            ? `${credentials.birthDate.year}-${String(
                credentials.birthDate.month
              ).padStart(2, "0")}-${String(credentials.birthDate.date).padStart(
                2,
                "0"
              )}`
            : undefined;

        return {
          url: `/v1/private/users/${id}`,
          method: "PUT",
          body: {
            name: credentials.name,
            avatarUrl: credentials.image, // Đổi image thành avatarUrl
            dob: dob, // Gửi dob thay vì birthDate
            gender: credentials.gender,
            roles: [], // Backend yêu cầu roles, gửi mảng rỗng nếu không có
          },
        };
      },
      invalidatesTags: [TAG_KEYS.USER],
    }),
  }),
});

export const { useUpdateUserMutation } = authApi;
