import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    amenityDetail: {},
}

const siteDetailSlice = createSlice({
    name: 'siteDetail',
    initialState,
    reducers: {
        getAmenityDetail: (state, action) => {
            state.amenityDetail = action.payload;
        }
    }
});

export const { getAmenityDetail } = siteDetailSlice.actions;
export default siteDetailSlice.reducer;