import { apiSlice } from "../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadImg: builder.mutation({
            query: (img) => ({
                url: '/api/users/avatar',
                method: 'PUT',
                body: img
            }),
            invalidatesTags: ['User'],
        }),

        userInfo: builder.query({
            query: () => '/api/users/detail',
            providesTags: ['User'],
        }),

        changePassword: builder.mutation({
            query: (data) => ({
                url: '/api/users/change-password',
                method: 'PUT',
                body: data
            }),
        }),

        removeAccount: builder.mutation({
            query: () => ({
                url: '/api/users/unactivated',
                method: 'PUT',
            }),
        }),
    }),
});

export const { useUploadImgMutation, 
                useUserInfoQuery, 
                useChangePasswordMutation,
                useRemoveAccountMutation } = userApiSlice;