import { combineReducers } from '@reduxjs/toolkit';

import gamesReducer from './features/game/gameSlice';
import gamesListReducer from './features/gamesList/gamesListSlice';

const rootReducer = combineReducers({
  gamesList: gamesListReducer,
  gameFull: gamesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
