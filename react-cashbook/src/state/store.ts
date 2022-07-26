import { configureStore } from '@reduxjs/toolkit'
import billReducer from './slices/billSlice'
import categoryReducer from './slices/categorySlice'

export const store = configureStore({
  reducer: {
    bill: billReducer,
    category: categoryReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch