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
        getSiteDetailReview: builder.query({
            query: (reviewId) => ({
                url: `/api/site-reviews/${reviewId}`,
                method: 'GET',
            }),
            providesTags: ['SiteDetail'],
        }),

        likeReview: builder.mutation({
            query: ({reviewId}) => ({
                url: `/api/site-reviews/${reviewId}/like`,
                method: 'POST',
            }),
            invalidatesTags: ['SiteReview'],
        }),
        unlikeReview: builder.mutation({
            query: ({reviewId}) => ({
                url: `/api/site-reviews/${reviewId}/dislike`,
                method: 'POST',
            }),
            invalidatesTags: ['SiteReview'],
        }),

        updateReview: builder.mutation({
            query: ({reviewId, formData}) => ({
                url: `/api/site-reviews/${reviewId}`,
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: ['SiteReview', 'SiteDetail'],
        }),
        removeReview: builder.mutation({
            query: (reviewId) => ({
                url: `/api/site-reviews/${reviewId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['SiteReview'],
        }),

        getMyReviews: builder.query({
            query: () => ({
                url: '/api/site-reviews/my-reviews',
                method: 'GET',
            }),
        }),

    }),
});

export const { usePostReviewMutation, 
                useGetSiteReviewsQuery, 
                useLikeReviewMutation,
                useUnlikeReviewMutation,
                useGetSiteDetailReviewQuery,
                useUpdateReviewMutation,
                useRemoveReviewMutation,
                useGetMyReviewsQuery } = reviewApiSlice;