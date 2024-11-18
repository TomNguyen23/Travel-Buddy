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
    }),
});

export const { useGetAmenityDetailQuery, 
                useGetNearbySitesQuery,
                useSearchSitesQuery  } = siteApiSlice;