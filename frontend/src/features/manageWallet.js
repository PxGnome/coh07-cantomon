import { createSlice } from "@reduxjs/toolkit"; 

export const managewalletSlice = createSlice({
    name: "walletslice",
    initialState: { 
        ethereumClient: ""
    },
    reducers: { 
        setEthereumClient: (state, action) => { 
            state.ethereumClient = action.payload.ethereumClient;
        }
    }
}); 

export const {  setEthereumClient } = managewalletSlice.actions;

export default managewalletSlice.reducer;