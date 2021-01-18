import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { updateOrder } from '../redux/actions/orders'
import { getAssetByStatus } from '../utils';
import CustomModal from '../components/CustomModal';
import { OrderType } from '../models';

export default function Orders(props: any) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<OrderType>();

    return (
        <main>
            <div className='results'>Showing {props.filteredOrderList.length} results</div>

            <div className='orders'>
                {props.filteredOrderList?.map((order: OrderType, i: number) => (
                    <div className={'orderCard'} key={i}>
                        <div className={'generalData'}>
                            <h6>{order.id}</h6>
                            <h4>{order.customer.name}</h4>
                            <h5>Order Placed: {new Date(order.createdDate).toLocaleDateString()}</h5>
                        </div>
                        <div className={'fulfillmentData'}>
                            <h4>{order.itemQuantity} Items</h4>
                            <img src={getAssetByStatus(order.fulfillmentStatus)} alt="icon" />
                            {order.fulfillmentStatus !== 'canceled' &&
                                <a href="" onClick={async (e) => {
                                    //CAll API and Update List 
                                    dispatch(updateOrder(order.id, order.fulfillmentStatus));
                                }}>Mark as {order.fulfillmentStatus === 'fulfilled' ?
                                    'Not Delivered' : 'Delivered'}</a>
                            }
                        </div>
                        <div className={'paymentData'}>
                            <h4>{order.price.formattedTotalPrice}</h4>
                            <img src={getAssetByStatus(order.billingInfo.status)} alt="icon" />
                        </div>
                        <div className={'button'}>
                            <a onClick={(e) => {
                                // Show Selected Order Detail
                                setSelectedOrder(order);
                                setShowModal(true);
                            }}>View More</a>
                        </div>
                    </div>
                ))}

                {(showModal && selectedOrder?.id) ? <CustomModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    order={selectedOrder}
                /> : null}

            </div>
        </main>
    )
}
