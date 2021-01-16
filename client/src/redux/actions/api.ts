import ApiService from './../../api/ApiService';
import { GET_ORDERS_REQUEST, GET_ORDERS_COMMIT, GET_ITEM_COMMIT } from './types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';

type Customer = {
    name: string;
}

type BillingInfo = {
    status: string;
}

type Price = {
    formattedTotalPrice: string;
}

export type Order = {
    id: number;
    createdDate: string;
    fulfillmentStatus: string;
    billingInfo: BillingInfo;
    customer: Customer;
    itemQuantity: number;
    price: Price;
}


interface IOrdersRequest {
    type: typeof GET_ORDERS_REQUEST
    isLoading: boolean
}

interface IOrdersCommit {
    type: typeof GET_ORDERS_COMMIT
    orders: Order[]
}

export type IAction = IOrdersRequest | IOrdersCommit

const isOrdersRequest = (isLoading: boolean): IOrdersRequest => {
    return { type: GET_ORDERS_REQUEST, isLoading: isLoading }
}

const getOrdersCommit = (orders: Order[]): IOrdersCommit => {
    return { type: GET_ORDERS_COMMIT, orders: orders }
}

const apiService = ApiService();

export const getOrders = (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>((resolve) => {
            dispatch(isOrdersRequest(true));
            apiService.getOrders().then((r) => {
                dispatch(getOrdersCommit(r));
                dispatch(isOrdersRequest(false));
                resolve();
            }).catch((e) => console.log(e));
        })
    }


/* export const getOrders = (username: string, password: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    // Invoke API
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>((resolve) => {
            dispatch(isOrdersRequest(true))
            console.log('Login in progress')
            setTimeout(() => {
                dispatch(getOrdersCommit('this_is_access_token'))
                setTimeout(() => {
                    dispatch(isOrdersRequest(false))
                    console.log('Login done')
                    resolve()
                }, 1000)
            }, 3000)
        })
    }
} */