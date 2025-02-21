import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '@/redux/reducer/auth.reducer';

const baseQuery = fetchBaseQuery({ 
    // baseUrl: 'http://localhost:8080',
    baseUrl: 'https://travel-buddy-production-6a3f.up.railway.app',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.login.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }

});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 403) {
        const { refreshToken } = api.getState().auth.login; 
        
        if (!refreshToken) {
            api.dispatch(logout());
            return result;
        }

        const refreshResult = await baseQuery(
        {
            url: '/api/auth/refresh-token',
            method: 'POST',
            headers: { 'Authorization': `Bearer ${refreshToken}` }  
        }, api, extraOptions);

        if (refreshResult?.data) {
            const user = api.getState().auth.login.user;
            api.dispatch(setCredentials({ ...refreshResult.data, user }));   
            result = await baseQuery(args, api, extraOptions);   // Gửi lại request ban đầu với token mới
        } else {
            api.dispatch(logout());  // Đăng xuất nếu refresh token không hợp lệ
        }
    }
    return result;
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User', 'SiteDetail', 'MyOwnedSites','SiteReview', 'TravelPlan', 'TravelPlanDetail'],
    // eslint-disable-next-line no-unused-vars
    endpoints: (builder) => ({ })
});