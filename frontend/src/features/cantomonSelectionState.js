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
                "Cantomon ....a....",
                "Cantomon ....b....",
                "Cantomon ....c...."
            ]
        },
        selected_enemy: ""
    },
    reducers: { 
        setCurrentCantomon: (state, action) => {  
            console.log("selected cantomon -> ", state);
            state.selected_cantomon = action.payload.selected_cantomon;
        },
        
        setCurrentEnemy: (state, action) => {  
            state.selected_enemy = action.payload.selected_enemy;
        }
    }
}); 

export const {  setCurrentCantomon, setCurrentEnemy } = cantomonselectionstate.actions;

export default cantomonselectionstate.reducer;