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
        EmailForgetPassword: builder.mutation({
            query: (body) => ({
                url: '/api/auth/reset-password',
                method: 'POST',
                body: body
            }),
        }),
        OTPforgetPassword: builder.mutation({
            query: (body) => ({
                url: '/api/auth/reset-password',
                method: 'PUT',
                body: body
            }),
        }),

    }),
});

export const {  useLoginMutation, 
                useRegisterMutation, 
                useOTPverificationMutation, 
                useEmailForgetPasswordMutation,
                useOTPforgetPasswordMutation } = authApiSlice;