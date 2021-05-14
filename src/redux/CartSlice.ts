import {
  createSlice,
  current,
  PayloadAction
} from '@reduxjs/toolkit';
import { AppState } from './RootReducer';
import Trip from 'types/Objects/Trip';

const cartInitialState: Trip[] = []

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<Trip>) => {
      if (!state.find(trip => trip.id === payload.id)) {
        return [
          ...state,
          payload
        ]
      }
    },
    removeFromCart: (state, { payload }: PayloadAction<{ id: number }>) => {
      const tripToRemoveIndex = current(state).findIndex(trip => trip.id === payload.id)

      if (tripToRemoveIndex > -1) {
        state.splice(tripToRemoveIndex, 1);
      }
    }
  }
})

export const getCart = (state: AppState) => state.cart;
export const getCartCount = (state: AppState) => state.cart.length;

export const {
  addToCart: addToCartActionCreator,
  removeFromCart: removeFromCartActionCreator
} = cartSlice.actions;

export default cartSlice.reducer