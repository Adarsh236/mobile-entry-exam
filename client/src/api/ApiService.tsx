import { OrderType, ItemType } from '../models';
import request from './ApiCentral';
import Urls from './Urls';

type ApiServiceType = {
    getOrders: () => Promise<OrderType[]>;
    getItem: (itemId: string[]) => Promise<ItemType[]>;
    updateOrder: (id: number, fulfillmentStatus: string) => Promise<OrderType[]>;
}

const ApiService = (): ApiServiceType => {
    return {
        getOrders: () => {
            return request({
                url: Urls.ORDERS,
                method: 'GET'
            });
        },
        getItem: (ids: string[]) => {
            const params = new URLSearchParams();
            ids.forEach((element) => {
                params.append('itemId', element);
            });
            return request({
                url: Urls.ITEMS,
                method: 'GET',
                params: params,
            });
        },
        updateOrder: (id: number, fulfillmentStatus: string) => {
            return request({
                url: Urls.ORDERS,
                method: 'PUT',
                data: { id: id, status: fulfillmentStatus },
            });
        }
    }
};


export default ApiService;