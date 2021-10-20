import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isEmpty, isEqual, isNil } from 'lodash';
import { convertHighlight } from '../utils/sentence.util';
import { IHighlight } from '../pdf-highlighter/types';


interface SearchResponse {
  url: string,
  data: any
}
const initialState: SearchResponse = {
    url: "",
    data: null
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        // toggleInPageLogin: (state, action) => {
        //     if (isNil(action) || isNil(action.payload)) {
        //       state.showInPageLogin = !state.showInPageLogin;
        //     } else {
        //       state.showInPageLogin = action.payload;
        //     }
        // },

        // setEmailSettings: (state, { payload }: any) => {
        // if (!payload) return;
    
        // state.emailSettings = { ...payload };
        // },

        setData: (
        state, { payload }: PayloadAction<any>) => {
        if (!payload) return;
        state.data = payload.Result;
        state.url = payload.URL
        // state.highlightSentence = convertHighlight(payload)
        // console.log("After Convert:", state.highlightSentence)
        },
    }

});

export const {
    setData
  } = dataSlice.actions;

export const dataReducer = dataSlice.reducer;