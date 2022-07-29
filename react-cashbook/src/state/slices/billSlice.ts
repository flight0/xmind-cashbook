import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Bill } from '../../types'

export interface BillState {
  value: Bill[]
}

const initialState: BillState = {
  value: [],
}

export const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    initBill: (state, action: PayloadAction<Bill[]>) => {
      state.value = action.payload;
    },
    addBill: (state, action: PayloadAction<Bill>) => {
      state.value.push(action.payload);
    }
  },
})

export const { addBill, initBill } = billSlice.actions

export default billSlice.reducer