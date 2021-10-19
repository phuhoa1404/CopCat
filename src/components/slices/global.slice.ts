import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isEmpty, isEqual, isNil } from 'lodash';
import { convertHighlight } from '../utils/sentence.util';
import { IHighlightPDF } from '../utils/models/pdf.model';

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        showInPageLogin: false,
        preference: {
            saveFile: true
        },
        emailSettings: {
        },
        dataMatch: {
        },
        highlightSentence: [] as any,
        url: ''
    },
    reducers: {
        toggleInPageLogin: (state, action) => {
            if (isNil(action) || isNil(action.payload)) {
              state.showInPageLogin = !state.showInPageLogin;
            } else {
              state.showInPageLogin = action.payload;
            }
        },

        setEmailSettings: (state, { payload }: any) => {
        if (!payload) return;
    
        state.emailSettings = { ...payload };
        },

        setData: (
        state, { payload }: PayloadAction<any>) => {
        if (!payload) return;
        state.highlightSentence = payload.Result;
        state.url = payload.URL
        // state.highlightSentence = convertHighlight(payload)
        // console.log("After Convert:", state.highlightSentence)
        },
    }

});

export const {
    toggleInPageLogin,
    setData,
    setEmailSettings
  } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;