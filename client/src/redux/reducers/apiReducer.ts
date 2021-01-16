import { GET_ORDERS_REQUEST, GET_ORDERS_COMMIT, GET_ITEM_COMMIT } from './../actions/types';
import { IAction, Order } from '../actions/api'

export interface IOrdersState {
    isLoading: boolean
    orders?: Order[]
}

const initialState: IOrdersState = {
    isLoading: false
};

export const apiReducer = (state: IOrdersState = initialState, action: IAction): IOrdersState => {
    switch (action.type) {
        case GET_ORDERS_REQUEST:
            return { ...state, isLoading: action.isLoading }
        case GET_ORDERS_COMMIT:
            return { ...state, orders: action.orders }
        default: return state;
    }
}
