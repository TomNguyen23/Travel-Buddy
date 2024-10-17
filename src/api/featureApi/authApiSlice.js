import { apiSlice } from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'api/login',
                method: 'POST',
                body: credentials
            }),
        }),
        register: builder.mutation({
            query: (body) => ({
                url: 'api/register',
                method: 'POST',
                body: body
            }),
        }),
        OTPverification: builder.mutation({
            query: (body) => ({
                url: 'api/verify',
                method: 'POST',
                body: body
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useOTPverificationMutation } = authApiSlice;