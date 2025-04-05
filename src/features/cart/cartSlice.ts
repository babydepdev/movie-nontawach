import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "@/utils/localstorageUtil";
import { Cart } from "@/types/global";

const KEY_LOCAL_STORAGE_CART = "cart";

interface CartState {
  items: Cart[];
}

const initialState: CartState = {
  items: getLocalStorage(KEY_LOCAL_STORAGE_CART, []),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Cart>) {
      state.items.push(action.payload);
      setLocalStorage(KEY_LOCAL_STORAGE_CART, state.items);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      setLocalStorage(KEY_LOCAL_STORAGE_CART, state.items);
    },
    setCart(state, action: PayloadAction<Cart[]>) {
      state.items = action.payload;
      setLocalStorage(KEY_LOCAL_STORAGE_CART, state.items);
    },
    clearCart(state) {
      state.items = [];
      setLocalStorage(KEY_LOCAL_STORAGE_CART, state.items);
    },
  },
});

export const { addToCart, removeFromCart, setCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
