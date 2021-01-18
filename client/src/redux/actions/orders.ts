import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import ApiService from './../../api/ApiService';
import { GET_ORDERS_REQUEST, GET_ORDERS_COMMIT } from './types';
import { OrderType } from '../../models';

interface IOrders {
    isLoading: boolean;
    orders: OrderType[];
}

interface IOrdersRequest extends IOrders {
    type: typeof GET_ORDERS_REQUEST;
}

interface IOrdersCommit extends IOrders {
    type: typeof GET_ORDERS_COMMIT;
}

export type OrdersActionTypes =
    | IOrdersRequest
    | IOrdersCommit;

const isOrdersRequest = (): OrdersActionTypes => ({
    type: GET_ORDERS_REQUEST,
    isLoading: true,
    orders: [],
});

const getOrdersCommit = (orders: OrderType[]): OrdersActionTypes => ({
    type: GET_ORDERS_COMMIT,
    isLoading: false,
    orders: orders,
});

const apiService = ApiService();

export const getOrders = (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>((resolve) => {
            dispatch(isOrdersRequest());
            apiService.getOrders().then((r) => {
                dispatch(getOrdersCommit(r));
                resolve();
            }).catch((e) => console.log(e));
        })
    }

export const updateOrder = (id: number, fulfillmentStatus: string): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>((resolve) => {
            dispatch(isOrdersRequest());
            apiService.updateOrder(id, fulfillmentStatus).then((r) => {
                dispatch(getOrdersCommit(r));
                resolve();
            }).catch((e) => console.log(e));
        })
    }