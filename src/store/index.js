import { configureStore } from '@reduxjs/toolkit';

import contestsReducer from './reducers/contests';

const store = configureStore({
  reducer: { contests: contestsReducer },
});

export default store;
