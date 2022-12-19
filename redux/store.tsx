import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import busReducer from './reducers/BusReducer'
import homeReducer from './reducers/HomeReducer'

const store = configureStore({
  reducer: {
    home: homeReducer,
    bus: busReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;