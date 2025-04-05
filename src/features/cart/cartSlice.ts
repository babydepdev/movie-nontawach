import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "@/utils/localstorageUtil";

interface CartState {
  items: any[];
}

const initialState: CartState = {
  items: getLocalStorage("cart", []),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<any>) {
      state.items.push(action.payload);
      setLocalStorage("cart", state.items);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      setLocalStorage("cart", state.items);
    },
    setCart(state, action: PayloadAction<any[]>) {
      state.items = action.payload;
      setLocalStorage("cart", state.items);
    },
    clearCart(state) {
      state.items = [];
      setLocalStorage("cart", state.items);
    },
  },
});

export const { addToCart, removeFromCart, setCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
