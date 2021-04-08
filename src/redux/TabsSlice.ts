import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import { AppState } from './RootReducer';

const tabsInitialState: number | false = false;

const tabsSlice = createSlice({
  name: 'tab',
  initialState: tabsInitialState as number | false,
  reducers: {
    setTab: (state, { payload }: PayloadAction<number | false>) => payload,
  }
})

export const getTab = (state: AppState) => state.tab;

export const { setTab } = tabsSlice.actions;

export default tabsSlice.reducer