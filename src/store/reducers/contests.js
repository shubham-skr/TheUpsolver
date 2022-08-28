import { createSlice } from '@reduxjs/toolkit';

const initialContestsState = [];

const contestsSlice = createSlice({
  name: 'contests',
  initialState: initialContestsState,
  reducers: {
    setContests(state, action) {
      return action.payload;
    },
    addContest(state, action) {
      return [...state, action.payload];
    },
    updateContest(state, action) {
      state[action.payload.index] = action.payload.contest;
    },
    removeContest(state, action) {
      const newState = state.filter(
        (contest) => contest._id !== action.payload._id
      );
      return newState;
    },
  },
});

export const contestsActions = contestsSlice.actions;
export default contestsSlice.reducer;
