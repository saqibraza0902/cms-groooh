import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: string;

  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item: any) => item.id === id
      );

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      console.log("Working");
      state.items = state.items.filter(
        (item: any) => item.id !== action.payload.id
      );
    },
    decrementItem: (state, action) => {
      const { id } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        if (state.items[itemIndex].quantity > 1) {
          state.items[itemIndex].quantity--;
        } else {
          state.items.splice(itemIndex, 1); // Remove item from array if quantity becomes 0
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, decrementItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
