import {createSlice} from '@reduxjs/toolkit';
import Match from './type';

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
  },
});
export const {addMatch} = matchSlice.actions;
export const reducer = matchSlice.reducer;
