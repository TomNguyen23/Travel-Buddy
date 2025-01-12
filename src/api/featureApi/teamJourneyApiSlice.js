import { apiSlice } from "../apiSlice";

export const teamJourneyApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllPlans: builder.query({
            query: () => '/api/travel-plans',
            providesTags: ['TravelPlan'],
        }),
        getTravelPlanDetail: builder.query({
            query: (id) => `/api/travel-plans/${id}`,
            providesTags: ['TravelPlanDetail'],
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
        editTravelPlan: builder.mutation({
            query(formData) {
                const { id, ...body } = formData
                return {
                    url: `/api/travel-plans/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            invalidatesTags: ['TravelPlanDetail'],
        }),

        addSiteToPlan: builder.mutation({
            query(formData) {
                const { planId, ...body } = formData
                return {
                    url: `/api/travel-plans/${planId}/add-site`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['TravelPlanDetail'],
        }),
        removeSiteOutPlan: builder.mutation({
            query(data) {
                const { planId, siteId } = data
                return {
                    url: `/api/travel-plans/${planId}/remove-site`,
                    method: 'DELETE',
                    body: { siteId }
                }
            },
            invalidatesTags: ['TravelPlanDetail'],
        }),
        editSiteInPlan: builder.mutation({
            query(formData) {
                const { planId, ...body } = formData
                return {
                    url: `/api/travel-plans/${planId}/update-site`,
                    method: 'PUT',
                    body,
                }
            },
            invalidatesTags: ['TravelPlanDetail'],
        }),

        addMemberToPlan: builder.mutation({
            query(formData) {
                const { planId, ...body } = formData
                return {
                    url: `/api/travel-plans/${planId}/add-member`,
                    method: 'PUT',
                    body,
                }
            },
            invalidatesTags: ['TravelPlanDetail'],
        }),
        changeRoleOfMember: builder.mutation({
            query(formData) {
                const { planId, ...body } = formData
                return {
                    url: `/api/travel-plans/${planId}/change-role`,
                    method: 'PUT',
                    body,
                }
            },
            invalidatesTags: ['TravelPlanDetail'],
        }),
        removeMemeberOutPlan: builder.mutation({
            query(formData) {
                const { planId, userId } = formData
                return {
                    url: `/api/travel-plans/${planId}/remove-member`,
                    method: 'DELETE',
                    body: { userId }
                }
            },
            invalidatesTags: ['TravelPlanDetail'],
        }),

        exitJourney: builder.mutation({
            query: (id) => ({
                url: `/api/travel-plans/${id}/exit`,
                method: 'DELETE',
            }),
            invalidatesTags: ['TravelPlan'],
        }),
    }),
});

export const { useGetAllPlansQuery, 
                useGetTravelPlanDetailQuery,
                useCreatNewTravelPlanMutation, 
                useRemoveTravelPlanMutation,
                useEditTravelPlanMutation,
                useAddSiteToPlanMutation,
                useRemoveSiteOutPlanMutation,
                useEditSiteInPlanMutation,
                useAddMemberToPlanMutation,
                useChangeRoleOfMemberMutation,
                useRemoveMemeberOutPlanMutation,
                useExitJourneyMutation } = teamJourneyApiSlice;