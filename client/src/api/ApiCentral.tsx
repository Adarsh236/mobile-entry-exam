import axios from 'axios';
import Urls from './Urls';
import * as React from 'react';

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

async function Request(options: any) {

    const client = axios.create({
        baseURL: Urls.BASE_URL,
    });

    const onSuccess = function (response: any) {
        return response.data;
    };

    const onError = function (error: any) {
        console.log('Request Failed:', error.config);

        if (error.response) {
            // Request was made but server responded with something
            // other than 2xx
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);
            console.log('Headers:', error.response.headers);
            //return Promise.reject(NavigationService.navigateToErrorScreen())
        } else {
            // Something else happened while setting up the request
            // triggered the error
            console.log('Error Message:', error.message);
            //return Promise.reject(error.message);
        }
    };

    return client(options).then(onSuccess).catch(onError);
}

export default Request;