import { createSlice } from '@reduxjs/toolkit'
import dayjs, { Dayjs } from 'dayjs';
interface ExpeditionState {
  expeditionInsertRes: any,
  selectedBus: Object,
  fee: number | string,
  fromProvince: number | string,
  toProvince: number | string,
  dateExp: Dayjs | null | Date,
  locationList: Array<any>,
  voyageList: Array<any>
}


const initialState: ExpeditionState = {
  expeditionInsertRes: "",
  selectedBus: "",
  fee: "",
  fromProvince: "",
  toProvince: "",
  dateExp: new Date(),
  locationList: [],
  voyageList: []
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
    },
    setLocationList: (state, payload) => {
      state.locationList = payload.payload;
    },
    setVoyageList: (state, payload) => {
      state.voyageList = payload.payload;
    }
  },

  extraReducers: (builder) => {

  }
})

export const { setExpeditionInsertRes, setSelectedBus, setFee, setFromProvince, setToProvince, setDateExp, setLocationList, setVoyageList } = expeditionReducer.actions

export default expeditionReducer.reducer
