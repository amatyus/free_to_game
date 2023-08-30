import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Filters, GamesList, getGamesList, paramByFilter } from '../../api/freeToPlayApi';
import { RootState } from '../../rootReducer';

interface GamesState {
  games: GamesList;
  filters: Filters;
  error: string | null;
  loading: boolean;
  currentRequestId: undefined | string;
}

type ErrorWithMessage = {
  status_message: string;
};

const filtersDefault: Record<keyof Filters, string> = {
  platform: 'all',
  category: 'all',
  sortBy: 'relevance',
};

const initialState: GamesState = {
  games: [],
  loading: false,
  filters: filtersDefault,
  error: null,
  currentRequestId: undefined,
};

export const fetchGamesList = createAsyncThunk(
  'games/fetchGamesList',
  async (arg, { signal, getState }) => {
    const { filters } = (getState() as RootState).gamesList;
    const controller = new AbortController();
    signal.addEventListener('abort', () => controller.abort());
    const params: Record<string, string> = {};

    //Убираем фильтр, если там значение по умолчанию и задаем нейминг ключа для параметра
    for (const filter in filters) {
      const value = filters[filter as keyof Filters];
      const paramName = paramByFilter[filter as keyof Filters];

      if (filtersDefault[filter as keyof Filters] !== value) {
        params[paramName] = value;
      }
    }

    return await getGamesList(params, controller.signal);
  },
);

const gamesList = createSlice({
  name: 'gamesList',
  initialState,
  reducers: {
    filtersChange: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGamesList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGamesList.fulfilled, (state, action) => {
        state.loading = false;

        if (Array.isArray(action.payload)) {
          state.games = action.payload;
        } else {
          state.games = [];
          state.error = (action.payload as ErrorWithMessage).status_message;
        }
      })
      .addCase(fetchGamesList.rejected, (state, action) => {
        state.loading = false;
        if (action.error) {
          state.error = action.error.message || 'Request error';
        }
      });
  },
});

export const { filtersChange } = gamesList.actions;

export default gamesList.reducer;
