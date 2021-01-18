import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import ApiService from './../../api/ApiService';
import { GET_ITEM_REQUEST, GET_ITEM_COMMIT } from './types';
import { ItemType } from '../../models';

interface IItems {
    isLoading: boolean;
    items: ItemType[];
}

interface IItemsRequest extends IItems {
    type: typeof GET_ITEM_REQUEST;
}

interface IItemsCommit extends IItems {
    type: typeof GET_ITEM_COMMIT;
}

export type ItemsActionTypes =
    | IItemsRequest
    | IItemsCommit;

const isItemsRequest = (): ItemsActionTypes => ({
    type: GET_ITEM_REQUEST,
    isLoading: true,
    items: [],
});

const getItemsCommit = (items: ItemType[]): ItemsActionTypes => ({
    type: GET_ITEM_COMMIT,
    isLoading: false,
    items: items,
});

const apiService = ApiService();

export const getItems = (id: string[]): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>((resolve) => {
            dispatch(isItemsRequest());
            apiService.getItem(id).then((r) => {
                dispatch(getItemsCommit(r));
                resolve();
            }).catch((e) => console.log(e));
        })
    }