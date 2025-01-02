import { apiSlice } from "../apiSlice";

export const recommendApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRecommentForYou: builder.query({
            query: () => '/api/recommendations/for-you',
        }),
        getRecommendForTeam: builder.query({
            query: (planId) => `/api/recommendations/for-plan/${planId}`,
        }),
        getRecommendDiscover: builder.query({
            query: ({ typeIds }) => {
                // Chuyển mảng typeIds thành chuỗi tham số đúng
                const typeIdsParam = typeIds?.length ? typeIds.join(',') : '';
                
                // Trả về URL đúng
                return `/api/recommendations/discover?typeIds=${typeIdsParam}`;
            },           
        }),
    }),
});

export const { 
    useGetRecommentForYouQuery,
    useGetRecommendForTeamQuery,
    useGetRecommendDiscoverQuery,
 } = recommendApiSlice;