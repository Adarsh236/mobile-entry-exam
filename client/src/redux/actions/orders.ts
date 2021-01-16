import ApiService from './../../api/ApiService';
import { GET_ORDERS_REQUEST, GET_ORDERS_COMMIT } from './types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';

type CustomerType = {
    name: string;
}

type BillingInfoType = {
    status: string;
}

type PriceType = {
    formattedTotalPrice: string;
}

export type OrderType = {
    id: number;
    createdDate: string;
    fulfillmentStatus: string;
    billingInfo: BillingInfoType;
    customer: CustomerType;
    itemQuantity: number;
    price: PriceType;
}

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