import { createSlice } from "@reduxjs/toolkit"; 

export const navstateSlice = createSlice({
    name: "navstate",
    initialState: { 
        current_page: "" 
    },
    reducers: { 
        setCurrentPage: (state, action) => {
            console.log("state -> ", state);
            state.current_page = action.payload.current_page;
        }
    }
}); 

export const {  setCurrentPage } = navstateSlice.actions;

export default navstateSlice.reducer;