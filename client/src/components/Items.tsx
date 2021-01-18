import React from 'react';
import { ItemType, OrderType } from '../models';

export default function Items(props: any) {
    const dateTime = new Date(props.order.createdDate);
    const getProductsQuantity = (orders: OrderType, id: string) => {
        const product = orders.items.filter((data) => (data.id === id));
        if (product.length) return product[0].quantity;
    }

    return (
        <div className='orders'>
            {props.products?.map((data: ItemType, i: number) => (
                <div className={'orderCard'} key={i}>
                    <div className={'generalData'}>
                        <img src={data.image} alt="products" className="productImg" />
                    </div>
                    <div className={'fulfillmentData'}>
                        <h4>Name: {data.name}</h4>
                        <h4>Price: {data.price}</h4>
                        <h4>Quantities: {getProductsQuantity(props.order, data.id)} Items</h4>
                        <h4>Order Placed: {dateTime.toLocaleDateString()}</h4>
                        <h4>Placed Time: {dateTime.toLocaleTimeString('en-US')}</h4>
                    </div>
                </div>
            ))}
        </div>
    );
}