import { combineReducers } from 'redux'
import { apiReducer } from './apiReducer'
import { orderReducer } from './orderReducer'

export const rootReducer = combineReducers({
    apiReducer,
    orderReducer
})