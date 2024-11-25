import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    siteID: '1',
    reviewID: '',
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
        },
        getReviewID: (state, action) => {
            state.reviewID = action.payload;
        }
    }
});

export const { getSideID, getAmenityDetail, getReviewID } = siteDetailSlice.actions;
export default siteDetailSlice.reducer;