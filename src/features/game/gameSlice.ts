import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { GameFull, getGameFull } from '../../api/freeToPlayApi';
import { getGameDataWithExpiry, setGameDataWithExpiry } from './localStorageUtils';

interface GameState {
  game: GameFull | null;
  loading: boolean;
  error: string | null;
}

const initialState: GameState = {
  game: null,
  loading: false,
  error: null,
};

export const fetchGame = createAsyncThunk(
  'games/fetchGame',
  async (id: number, { signal }) => {
    const gameFromStorage = getGameDataWithExpiry(id);

    if (gameFromStorage) {
      return await Promise.resolve(gameFromStorage);
    }

    const controller = new AbortController();
    signal.addEventListener('abort', () => controller.abort());

    return await getGameFull({ id }, controller.signal);
  },
);

const gameFull = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addGame: (state, action) => {
      state.game = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGame.pending, (state) => {
        state.loading = true;
        state.game = null;
        state.error = null;
      })
      .addCase(fetchGame.fulfilled, (state, action) => {
        state.loading = false;
        state.game = action.payload;

        setGameDataWithExpiry(action.payload);
      })
      .addCase(fetchGame.rejected, (state, action) => {
        state.loading = false;
        state.game = null;

        if (action.error) {
          state.error = action.error.message || 'Request error';
        }
      });
  },
});

export default gameFull.reducer;
