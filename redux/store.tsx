import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import busReducer from './reducers/BusReducer'
import buyTicketReducer from './reducers/BuyTicketReducer'
import voyageReducer from './reducers/VoyageReducer'
import graphReducer from './reducers/GraphReducer'
import homeReducer from './reducers/HomeReducer'

const store = configureStore({
  reducer: {
    home: homeReducer,
    bus: busReducer,
    graph: graphReducer,
    voyage: voyageReducer,
    buyTicket: buyTicketReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;