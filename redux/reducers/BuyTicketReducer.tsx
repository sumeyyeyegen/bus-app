import { createSlice } from '@reduxjs/toolkit'

interface BuyTicketState {
  selectedVoyage: any
}

const initialState: BuyTicketState = {
  selectedVoyage: ""
}

export const buyTicketReducer = createSlice({
  name: 'buyTicket',
  initialState: initialState,
  reducers: {
    setSelectedVoyage: (state, payload) => {
      state.selectedVoyage = payload.payload;
    }
  },

  extraReducers: (builder) => {
  }
})

export const { setSelectedVoyage } = buyTicketReducer.actions

export default buyTicketReducer.reducer
