import { GET_ITEM_REQUEST, GET_ITEM_COMMIT } from '../actions/types';
import { ItemsActionTypes } from '../actions/items'
import { ItemType } from '../../models';

export interface IItemsState {
    isLoading: boolean
    items: ItemType[]
}

const initialState: IItemsState = {
    isLoading: false,
    items: []
};

export const itemReducer = (state: IItemsState = initialState, action: ItemsActionTypes): IItemsState => {
    switch (action.type) {
        case GET_ITEM_REQUEST:
            return { ...state, isLoading: action.isLoading, items: [] }
        case GET_ITEM_COMMIT:
            return { ...state, isLoading: action.isLoading, items: action.items }
        default:
            return state;
    }
}
