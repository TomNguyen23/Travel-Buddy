import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    siteID: '1',
    amenityDetail: {},
}

const siteDetailSlice = createSlice({
    name: 'siteDetail',
    initialState,
    reducers: {
        getSideID: (state, action) => {
            state.siteID = action.payload;
        },
        getAmenityDetail: (state, action) => {
            state.amenityDetail = action.payload;
        }
    }
});

export const { getSideID, getAmenityDetail } = siteDetailSlice.actions;
export default siteDetailSlice.reducer;