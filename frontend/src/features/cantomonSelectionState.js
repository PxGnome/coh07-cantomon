import { createSlice } from "@reduxjs/toolkit";
import Creatures3 from "./../assets/cantomon/creatures3.png";
export const cantomonselectionstate = createSlice({
    name: "cantomonselectionstate",
    initialState: { 
        selected_cantomon: {
            "id": "1",
            "image": Creatures3,
            "title": "Metamon",
            "description": [
                "Metamon ....a....",
                "Metamon ....b....",
                "Metamon ....c...."
            ]
        }
    },
    reducers: { 
        setCurrentCantomon: (state, action) => { 
            console.log("selected cantomon -> ", state);
            state.selected_cantomon = action.payload.selected_cantomon;
        }
    }
}); 

export const {  setCurrentCantomon } = cantomonselectionstate.actions;

export default cantomonselectionstate.reducer;