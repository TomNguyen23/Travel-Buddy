import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    newSiteInfo: {}
}

const newSiteSlice = createSlice({
    name: 'newSite',
    initialState,
    reducers: {
        getNewSiteType: (state, action) => {
            state.newSiteInfo = action.payload;
        },

        getNewSitebasicInfo: (state, action) => {
            state.newSiteInfo = { ...state.newSiteInfo, ...action.payload };
        },

        getNewSiteCoordinates(state, action) {
            state.newSiteInfo = { ...state.newSiteInfo, ...action.payload };
        }
    }
});

export const { getNewSiteType, getNewSitebasicInfo, getNewSiteCoordinates } = newSiteSlice.actions;
export default newSiteSlice.reducer;