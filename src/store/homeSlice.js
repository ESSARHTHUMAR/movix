import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        url: {},
        geners: {},
    },

    reducers: {
        getApiConfiguration: (state, action) => {
            state.url = action.payload;
        },
        getGeners: (state, action) => {
            state.geners = action.payload;
        }
    }

})

export const { getApiConfiguration, getGeners } = homeSlice.actions

export default homeSlice.reducer