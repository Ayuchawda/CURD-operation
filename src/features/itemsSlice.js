// src/features/itemsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push({ id: state.items.length + 1, ...action.payload });
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateItem: (state, action) => {
      const { id, name, age } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.name = name;
        existingItem.age = age;
      }
    },
  },
});

export const { addItem, deleteItem, updateItem } = itemsSlice.actions;
export default itemsSlice.reducer;
