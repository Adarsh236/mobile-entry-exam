import { combineReducers } from 'redux'
import { orderReducer } from './orderReducer'
import { itemReducer } from './itemReducer'

export const rootReducer = combineReducers({
    orderReducer,
    itemReducer
})