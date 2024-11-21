import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    journeyID: '',
    travelPlanDetail: {},
}

const teamJourneySlice = createSlice({
    name: 'teamJourney',
    initialState,
    reducers: {
        getJourneyID: (state, action) => {
            state.journeyID = action.payload;
        },
        getTravelPlanDetail: (state, action) => {
            state.travelPlanDetail = action.payload;
        }
    }
});

export const { getJourneyID, getTravelPlanDetail } = teamJourneySlice.actions;
export default teamJourneySlice.reducer;