import request from './ApiCentral';
import Urls from './Urls';

export type Customer = {
    name: string;
}

export type BillingInfo = {
    status: string;
}

export type Price = {
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

export type Item = {
    id: string;
    name: string;
    price: number;
    image: string;
}

export type ApiService = {
    getOrders: () => Promise<Order[]>;
    getItem: (itemId: string) => Promise<Item>;
    updateOrder: (id: number, fulfillmentStatus: string) => Promise<Order[]>;
}

const ApiService = (): ApiService => {
    return {
        getOrders: () => {
            return request({
                url: Urls.ORDERS,
                method: 'GET'
            });
        },
        getItem: (itemId: string) => {
            return request({
                url: Urls.ORDERS + itemId,
                method: 'GET'
            });
        }, updateOrder: (id: number, fulfillmentStatus: string) => {

            return request({
                url: Urls.ORDERS,
                method: 'PUT',
                data: { id: id, status: fulfillmentStatus },
            });
        }
    }
};


export default ApiService;