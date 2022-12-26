import { createSlice } from '@reduxjs/toolkit'
import dayjs, { Dayjs } from 'dayjs';
interface ExpeditionState {
  expeditionInsertRes: any,
  selectedBus: Object,
  fee: number | string,
  fromProvince: number | string,
  toProvince: number | string,
  dateExp: Dayjs | null
}


const initialState: ExpeditionState = {
  expeditionInsertRes: "",
  selectedBus: "",
  fee: "",
  fromProvince: "",
  toProvince: "",
  dateExp: null
}
export const expeditionReducer = createSlice({
  name: 'expedition',
  initialState: initialState,
  reducers: {
    setExpeditionInsertRes: (state, payload) => {
      state.expeditionInsertRes = payload.payload;
    },
    setSelectedBus: (state, payload) => {
      state.selectedBus = payload.payload;
    },
    setFee: (state, payload) => {
      state.fee = payload.payload;
    },
    setFromProvince: (state, payload) => {
      state.fromProvince = payload.payload;
    },
    setToProvince: (state, payload) => {
      state.toProvince = payload.payload;
    },
    setDateExp: (state, payload) => {
      state.dateExp = payload.payload;
    }
  },

  extraReducers: (builder) => {

  }
})

export const { setExpeditionInsertRes, setSelectedBus, setFee, setFromProvince, setToProvince, setDateExp } = expeditionReducer.actions

export default expeditionReducer.reducer
