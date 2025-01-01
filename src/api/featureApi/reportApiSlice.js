import { apiSlice } from "../apiSlice";

export const reportApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReviewReportReasons: builder.query({
            query: () => ({
                url: '/api/report/site-review/categories',
                method: 'GET',
            }),
        }),
        getUserReportReasons: builder.query({
            query: () => ({
                url: '/api/report/user/categories',
                method: 'GET',
            }),
        }),
        getSiteReportReasons: builder.query({
            query: () => ({
                url: '/api/report/site/categories',
                method: 'GET',
            }),
        }),

        postReportReview: builder.mutation({
            query: (data) => ({
                url: '/api/report/site-review',
                method: 'POST',
                body: data
            }),
        }),
        postReportUser: builder.mutation({
            query: (data) => ({
                url: '/api/report/user',
                method: 'POST',
                body: data
            }),
        }),
        postReportSite: builder.mutation({
            query: (data) => ({
                url: '/api/report/site',
                method: 'POST',
                body: data
            }),
        }),
    }),
});

export const { 
    useGetReviewReportReasonsQuery,
    useGetUserReportReasonsQuery,
    useGetSiteReportReasonsQuery,
    usePostReportReviewMutation,
    usePostReportUserMutation,
    usePostReportSiteMutation,
 } = reportApiSlice;