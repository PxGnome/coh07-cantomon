import { configureStore } from "@reduxjs/toolkit"; 
import { combineReducers } from "redux";
import thunk from "redux-thunk";

import logger from "redux-logger";

import collection from "../features/manageCollection";
import navstate from "../features/manageNavigationState";
import managewalletSlice from "@/features/manageWallet";
import cantomonSelectionState from "@/features/cantomonSelectionState";

const reducers = combineReducers({ 
    collectionStore: collection,
    navStore: navstate,
    cantomonStore: cantomonSelectionState,
    walletStore: managewalletSlice
});

export default configureStore({
    reducer: reducers,
    devTools: true, 
    middleware: [thunk, logger],
});
  