import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { fetchWrapper } from '../../helpers'

interface BusState {
  selectedBrand: number | any,
  selectedModel: any,
  selectedType: any,
  selectedProp: any,
  brandList: any,
  propList: any,
  typeList: any,
  modelList: any,
  busInsertRes: any,
  edit: boolean,
  seatNumber: any,
  busUpdateRes: any,
  plateList: Array<any>,
  plateNumber: any
}

// Define the initial state using that type
const initialState: BusState = {
  selectedBrand: "",
  selectedModel: "",
  selectedType: "",
  selectedProp: [],
  brandList: [],
  propList: [],
  typeList: [],
  modelList: [],
  busInsertRes: "",
  edit: false,
  seatNumber: "",
  busUpdateRes: "",
  plateList: [],
  plateNumber: ""
}

export const fetchModelById = createAsyncThunk(
  'bus/fetchById',
  async (brandId: any, thunkAPI) => {
    let token: any = Cookies.get("user-token");
    const response = await fetchWrapper.get(`http://localhost:83/api/models/?brandId=${brandId}`, token);
    console.log("res", response)
    return response.data.data
  }
)

export const busReducer = createSlice({
  name: 'bus',
  initialState: initialState,
  reducers: {
    setSelectedBrand: (state, payload) => {
      state.selectedBrand = payload.payload;
    },
    setSelectedModel: (state, payload) => {
      state.selectedModel = payload.payload;
    },
    setSelectedProp: (state, payload) => {
      state.selectedProp = payload.payload;
    },
    setSelectedType: (state, payload) => {
      state.selectedType = payload.payload;
    },
    setBrandList: (state, payload) => {
      state.brandList = payload.payload;
    },
    setPropList: (state, payload) => {
      state.propList = payload.payload;
    },
    setTypeList: (state, payload) => {
      state.typeList = payload.payload;
    },
    setModelList: (state, payload) => {
      state.modelList = payload.payload;
    },
    setBusInsertRes: (state, payload) => {
      state.busInsertRes = payload.payload;
    },
    setEdit: (state, payload) => {
      state.edit = payload.payload;
    },
    setSeatNumber: (state, payload) => {
      state.seatNumber = payload.payload
    },
    setBusUpdateRes: (state, payload) => {
      state.busUpdateRes = payload.payload;
    },
    setPlateList: (state, payload) => {
      state.plateList = payload.payload;
    },
    setPlateNumber: (state, payload) => {
      state.plateNumber = payload.payload;
    }
  },

  extraReducers: (builder) => {

    builder.addCase(fetchModelById.fulfilled, (state, action) => {
      console.log(action.payload)
      state.modelList = action?.payload
    }),
      builder.addCase(fetchModelById.rejected, (state, action) => {
        console.log(action.payload)
        // state.modelListErr = action.payload 
      })
  }
})

export const { setSelectedBrand, setBrandList, setPropList, setTypeList, setSelectedModel, setModelList, setSelectedProp, setSelectedType, setBusInsertRes, setEdit, setSeatNumber, setBusUpdateRes, setPlateList, setPlateNumber } = busReducer.actions

export default busReducer.reducer
