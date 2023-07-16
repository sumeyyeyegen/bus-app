import { createSlice } from '@reduxjs/toolkit'
import dayjs, { Dayjs } from 'dayjs';
interface VoyageState {
  voyageInsertRes: any,
  selectedBus: Object,
  fee: number | string,
  fromProvince: number | string,
  toProvince: number | string,
  dateExp: Dayjs | null | Date,
  locationList: Array<any>,
  voyageList: Array<any>
}


const initialState: VoyageState = {
  voyageInsertRes: "",
  selectedBus: "",
  fee: "",
  fromProvince: "",
  toProvince: "",
  dateExp: new Date(),
  locationList: [],
  voyageList: []
}
export const voyageReducer = createSlice({
  name: 'voyage',
  initialState: initialState,
  reducers: {
    setVoyageInsertRes: (state, payload) => {
      state.voyageInsertRes = payload.payload;
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

export const { setVoyageInsertRes, setSelectedBus, setFee, setFromProvince, setToProvince, setDateExp, setLocationList, setVoyageList } = voyageReducer.actions

export default voyageReducer.reducer
