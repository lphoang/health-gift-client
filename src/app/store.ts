import { rootReducer } from './../features/rootReducer';
import { configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import { loadState, saveState } from './stateLs';

const persistedStore = loadState();

export const store = configureStore({
  preloadedState: persistedStore,
  reducer: rootReducer,
  devTools: true,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

