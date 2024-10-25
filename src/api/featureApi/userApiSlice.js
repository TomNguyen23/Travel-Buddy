import { apiSlice } from "../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadImg: builder.mutation({
            query: (img) => ({
                url: 'api/upload',
                method: 'POST',
                body: img
            }),
        }),
    }),
});

export const { useUploadImgMutation } = userApiSlice;