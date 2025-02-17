import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [
        {
            id: 1,
            name: "Địa điểm tham quan",
            image: "https://images.pexels.com/photos/13021772/pexels-photo-13021772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            to: "destination"
        },
        {
            id: 2,
            name: "Điểm đến giải trí",
            image: "https://images.pexels.com/photos/13400067/pexels-photo-13400067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            to: "entertainment"
        },
        {
            id: 3,
            name: "Hòa vào thiên nhiên",
            image: "https://images.pexels.com/photos/450441/pexels-photo-450441.jpeg",
            to: "nature"
        },
        {
            id: 4,
            name: "Khám phá ẩm thực",
            image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            to: "cuisine"
        },
        {
            id: 5,
            name: "Khách sạn & Resort",
            image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            to: "hotel&resort"
        },
    ]
};

const discoverSlice = createSlice({
    name: 'discover',
    initialState,
    reducers: {
        getCategories: (state) => {
            return state.categories;
        }
    }
});

export const { getCategories } = discoverSlice.actions;
export default discoverSlice.reducer;