import { GET_ORDERS_REQUEST, GET_ORDERS_COMMIT } from './../actions/types';
import { OrdersActionTypes, OrderType } from '../actions/orders'

export interface IOrdersState {
    isLoading: boolean
    orders: OrderType[]
}

const initialState: IOrdersState = {
    isLoading: false,
    orders: []
};

export const orderReducer = (state: IOrdersState = initialState, action: OrdersActionTypes): IOrdersState => {
    switch (action.type) {
        case GET_ORDERS_REQUEST:
            return { ...state, isLoading: action.isLoading, orders: [] }
        case GET_ORDERS_COMMIT:
            return { ...state, isLoading: action.isLoading, orders: action.orders }
        default:
            return state;
    }
}
