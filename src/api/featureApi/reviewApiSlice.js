import { apiSlice } from "../apiSlice";

export const reviewApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postReview: builder.mutation({
            query: (data) => ({
                url: '/api/site-reviews',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['SiteReview', 'SiteDetail'],
        }),
        getSiteReviews: builder.query({
            query: (siteId) => ({
                url: `/api/sites/${siteId}/reviews`,
                method: 'GET',
            }),
            providesTags: ['SiteReview'],
        }),
        likeReview: builder.mutation({
            query: ({reviewId}) => ({
                url: `/api/site-reviews/${reviewId}/like`,
                method: 'POST',
            }),
            invalidatesTags: ['SiteReview'],
        }),

    }),
});

export const { usePostReviewMutation, useGetSiteReviewsQuery, useLikeReviewMutation } = reviewApiSlice;