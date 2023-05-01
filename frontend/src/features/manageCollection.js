import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; 



export const getNFtsCollectionFromMoralis = createAsyncThunk(
    "getNFtsCollectionFromMoralis",
    async (data, { getState, rejectWithValue }) => {
         try {
            const response = await axios.request( {
              method: 'GET',
              url: `https://deep-index.moralis.io/api/v2/${data.wallet_address}/nft/collections?chain=${data.chain}`,
              headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-API-Key': "0X8FKz8cxNsP7SoVIPrHl5ledtxrAmpfFfbblugL2JZvtrz3vJZNMnToDZ4W5OoW"
                }
            });  
            return response.data;
          } catch (error) { 
            return rejectWithValue(error);
          }
    }
); 
export const getNFtsByCollectionAddressFromMoralis = createAsyncThunk(
    "getNFtsByCollectionAddressFromMoralis",
    async (data, { getState, rejectWithValue }) => {
        try {
            const response = await axios.request( {
              method: 'GET',
              url: `https://deep-index.moralis.io/api/v2/nft/${data.address}?chain=${data.chain}&format=decimal&media_items=true&normalizeMetadata=true`,
              headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-API-Key': "0X8FKz8cxNsP7SoVIPrHl5ledtxrAmpfFfbblugL2JZvtrz3vJZNMnToDZ4W5OoW"
                }
            });
 
            return response.data;
          } catch (error) {
            return rejectWithValue(error);
          }
    }
); 



export const collection = createSlice({
    name: "collection",
    initialState: { 
        nftMetadata: {
            data: [],
            loading: false,
            error: false,
            success: false
        },
        nftsCollection: {
            nfts: [],
            loading: false,
            error: false,
            success: false
        }, 
    },
    reducers: { 
        setNFTMetadata: (state, action) => {
            state.metadata = action.payload;
        }
    },
    extraReducers: (builder) => {
        
        builder.addCase(getNFtsCollectionFromMoralis.fulfilled, (state, action) => {
            state.nftsCollection = {
                loading: false,
                error: false,
                success: true,
                nfts: action.payload.result
            };
        })
        builder.addCase(getNFtsCollectionFromMoralis.pending, (state, action) => {
            state.nftsCollection = {
                loading: true,
                error: false,
                success: false
            };
        })
        builder.addCase(getNFtsCollectionFromMoralis.rejected, (state, action) => {  
            state.nftsCollection = {
                loading: false,
                error: true,
                success: false
            };
        })

        
        builder.addCase(getNFtsByCollectionAddressFromMoralis.fulfilled, (state, action) => {
            state.nftMetadata = {
                loading: false,
                error: false,
                success: true,
                data: action.payload.result
            };
        })
        builder.addCase(getNFtsByCollectionAddressFromMoralis.pending, (state, action) => {
            state.nftMetadata = {
                loading: true,
                error: false,
                success: false
            };
        })
        builder.addCase(getNFtsByCollectionAddressFromMoralis.rejected, (state, action) => {
            state.nftMetadata = {
                loading: false,
                error: true,
                success: false
            };
        })

    }
}); 

export const {  setNFTMetadata } = collection.actions;

export default collection.reducer;
