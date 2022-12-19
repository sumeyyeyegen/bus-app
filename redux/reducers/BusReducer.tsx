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
  modelList: any
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
  modelList: []
}

export const fetchModelById = createAsyncThunk(
  'bus/fetchById',
  async (brandId: any, thunkAPI) => {
    let token: any = Cookies.get("user-token");
    const response = await fetchWrapper.get(`http://localhost:82/api/model/${brandId}`, token);
    return response.data.model
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

export const { setSelectedBrand, setBrandList, setPropList, setTypeList, setSelectedModel, setModelList, setSelectedProp, setSelectedType } = busReducer.actions

export default busReducer.reducer