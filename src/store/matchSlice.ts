import {createSlice} from '@reduxjs/toolkit';
import Match from './type';
import {act} from 'react-test-renderer';

const initialState = {
  matchs: [] as Match[],
};
const matchSlice = createSlice({
  name: 'matchs',
  initialState,
  reducers: {
    addMatch: (state, action) => {
      const match = action.payload;
      if (!state.matchs.find(m => m.id === match.id)) {
        state.matchs.push(match);
      }
    },
    editMatch: (state, action) => {
      const match = action.payload;
      const index = state.matchs.findIndex(m => m.id === match.id);
      state.matchs[index] = match;
    },
  },
});
export const {addMatch, editMatch} = matchSlice.actions;
export const reducer = matchSlice.reducer;
