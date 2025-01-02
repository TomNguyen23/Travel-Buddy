import { apiSlice } from "../apiSlice";

export const notificationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotification: builder.query({
            query: () => '/api/notification',
        }),
    }),
});

export const { useGetNotificationQuery } = notificationApiSlice;