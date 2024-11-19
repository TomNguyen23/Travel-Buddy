import { apiSlice } from "../apiSlice";

export const teamJourneyApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllPlans: builder.query({
            query: () => '/api/travel-plans',
            providesTags: ['TravelPlan'],
        }),
        creatNewTravelPlan: builder.mutation({
            query: (body) => ({
                url: '/api/travel-plans',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['TravelPlan'],
        }),
        removeTravelPlan: builder.mutation({
            query: (id) => ({
                url: `/api/travel-plans/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['TravelPlan'],
        }),
    }),
});

export const { useGetAllPlansQuery, 
                useCreatNewTravelPlanMutation, 
                useRemoveTravelPlanMutation  } = teamJourneyApiSlice;