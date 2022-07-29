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
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
    initBill: (state, action: PayloadAction<Bill[]>) => {
      state.value = action.payload;
    },
    addBill: (state, action: PayloadAction<Bill>) => {
      state.value.push(action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { addBill, initBill } = billSlice.actions

export default billSlice.reducer