import { createSlice } from '@reduxjs/toolkit'

interface BuyTicketState {
  selectedVoyage: any,
  clickList: Array<Object>,
  selectedSeat: string | number | undefined,
  filterError: string,
  filteredVoyageList: Array<any>
}

const initialState: BuyTicketState = {
  selectedVoyage: "",
  clickList: [],
  selectedSeat: "",
  filterError: "",
  filteredVoyageList: []
}

export const buyTicketReducer: any = createSlice({
  name: 'buyTicket',
  initialState: initialState,
  reducers: {
    setSelectedVoyage: (state, payload) => {
      state.selectedVoyage = payload.payload;
    },
    setClickList: (state, payload) => {
      state.clickList = payload.payload;
    },
    setSelectedSeat: (state, payload) => {
      state.selectedSeat = payload.payload;
    },
    setFilterError: (state, payload) => {
      state.filterError = payload.payload;
    },
    setFilteredVoyageList: (state, payload) => {
      state.filteredVoyageList = payload.payload;
    }
  },

  extraReducers: (builder) => {
  }
})

export const { setSelectedVoyage, setClickList, setSelectedSeat, setFilterError, setFilteredVoyageList } = buyTicketReducer.actions

export default buyTicketReducer.reducer
