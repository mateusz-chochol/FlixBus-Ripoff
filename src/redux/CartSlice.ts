import {
  createSlice,
  current,
  PayloadAction
} from '@reduxjs/toolkit';
import { AppState } from './RootReducer';
import CartTrip from 'types/Objects/CartTrip'

const cartInitialState: CartTrip[] = JSON.parse(localStorage.getItem('cart') || "[]") as CartTrip[];

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<CartTrip>) => {
      if (!state.find(cartTrip => cartTrip.trip.id === payload.trip.id)) {
        return [
          ...state,
          payload
        ]
      }
    },
    removeFromCart: (state, { payload }: PayloadAction<{ id: number }>) => {
      const tripToRemoveIndex = current(state).findIndex(cartTrip => cartTrip.trip.id === payload.id)

      if (tripToRemoveIndex > -1) {
        state.splice(tripToRemoveIndex, 1);
      }
    },
    emptyCart: (state) => cartInitialState,
  }
})

export const getCart = (state: AppState) => state.cart;
export const getCartCount = (state: AppState) => state.cart.length;

export const {
  addToCart: addToCartActionCreator,
  removeFromCart: removeFromCartActionCreator,
  emptyCart: emptyCartActionCreator,
} = cartSlice.actions;

export default cartSlice.reducer