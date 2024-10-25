import { apiSlice } from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/api/auth/login',
                method: 'POST',
                body: credentials
            }),
        }),
        register: builder.mutation({
            query: (body) => ({
                url: '/api/auth/register',
                method: 'POST',
                body: body
            }),
        }),
        OTPverification: builder.mutation({
            query: (body) => ({
                url: '/api/auth/confirm-registration',
                method: 'POST',
                body: body
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useOTPverificationMutation } = authApiSlice;