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
        getSiteServices: builder.query({
            query: (siteTypeId) => `/api/site-types/${siteTypeId}/services`,
        }),

        getCoordinatesByAddress: builder.query({
            query: ({address}) => `https://api.mapbox.com/search/geocode/v6/forward?q=${address}&access_token=${import.meta.env.VITE_REACT_APP_MAPBOX_API_KEY}`,
        }),

        postNewSite: builder.mutation({
            query: (newSite) => ({
                url: '/api/sites',
                method: 'POST',
                body: newSite,
            }),
        }),

        getAllSites: builder.query({
            query: (page) => `/api/sites/discover?page=${page}`,
        }),

        getMyPostedSites: builder.query({
            query: () => '/api/sites/my-sites',
        }),
        getMyOwnedSites: builder.query({
            query: (siteID) => `/api/sites?version=${siteID}`,
        }),
    }),
});

export const { useGetAmenityDetailQuery, 
                useGetNearbySitesQuery,
                useSearchSitesQuery,
                useGetSiteTypeQuery,
                useGetSiteTypeAspectsFeeQuery,
                useGetSiteServicesQuery,
                useGetCoordinatesByAddressQuery,
                usePostNewSiteMutation,
                useGetMyPostedSitesQuery,
                useGetMyOwnedSitesQuery,
                useGetAllSitesQuery } = siteApiSlice;