import { apiSlice } from "../apiSlice";

export const siteApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAmenityDetail: builder.query({
            query: (id) => `api/sites/${id}`,
            providesTags: ['SiteDetail'],
        }),
        getNearbySites: builder.query({
            query: ({lat, lng, degRadius}) => `/api/sites/@?lat=${lat}&lng=${lng}&degRadius=${degRadius}`,
        }),

        searchSites: builder.query({
            query: ({searchValue}) => `/api/sites/search?q=${searchValue}&page=1`,
        }),

        getSiteType: builder.query({
            query: () => '/api/admin/site-types',
        }),
        getSiteTypeAspectsFee: builder.query({
            query: (siteTypeId) => `/api/site-types/${siteTypeId}/aspects`,
        }),
    }),
});

export const { useGetAmenityDetailQuery, 
                useGetNearbySitesQuery,
                useSearchSitesQuery,
                useGetSiteTypeQuery,
                useGetSiteTypeAspectsFeeQuery } = siteApiSlice;