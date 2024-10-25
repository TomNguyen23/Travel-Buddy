import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '@/redux/reducer/auth.reducer';

const baseQuery = fetchBaseQuery({ 
    baseUrl: 'http://localhost:8080',
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
        const refreshResult = await baseQuery('api/refresh', api, extraOptions);

        if (refreshResult?.data) {
            const user = api.getState().auth.login.user;
            api.dispatch(setCredentials({ ...refreshResult.data, user }));   // store new token
            result = await baseQuery(args, api, extraOptions);   // retry the original request with the new token
        }
        else {
            api.dispatch(logout());
        }
    }
    return result;
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    // tagTypes: ['User'],
    // eslint-disable-next-line no-unused-vars
    endpoints: (builder) => ({ })
});