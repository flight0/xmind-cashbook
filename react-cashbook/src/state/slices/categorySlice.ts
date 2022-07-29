import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Category } from '../../types'

export interface CategoryState {
  value: Category[]
}

const initialState: CategoryState = {
  value: [],
}

export const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    initCategory: (state, action: PayloadAction<Category[]>) => {
      state.value = action.payload;
    },
  },
})

export const { initCategory } = CategorySlice.actions
export default CategorySlice.reducer