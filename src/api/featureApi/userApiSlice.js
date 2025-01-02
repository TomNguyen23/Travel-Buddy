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

        searchUser: builder.query({
            query: ({searchValue}) => `/api/users/search?q=${searchValue}&page=1`,
        }),

        getPersonalize: builder.query({
            query: () => '/api/personalization',
        }),
        postPersonalize: builder.mutation({
            query: (data) => ({
                url: '/api/personalization',
                method: 'POST',
                body: data
            }),
        })
    }),
});

export const { useUploadImgMutation, 
                useUserInfoQuery, 
                useChangePasswordMutation,
                useRemoveAccountMutation,
                useSearchUserQuery,
                useGetPersonalizeQuery,
                usePostPersonalizeMutation } = userApiSlice;