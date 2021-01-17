import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { OrderType, getOrders } from '../redux/actions/orders'
import { getAssetByStatus } from '../utils';

function CustomModal(props: any) {
    console.log(props);
    let list = props.order ? props.order : [];
    let dateTime = new Date(list.createdDate);
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h2> Products Details: </h2>
                <div className='orders'>
                    {list.items?.map((data: { quantity: number }) => (
                        <div className={'orderCard'}>
                            <div className={'generalData'}>
                                <img src={getAssetByStatus("not-fulfilled")} />
                            </div>
                            <div className={'fulfillmentData'}>
                                <h4>Name: yy</h4>
                                <h4>Quantities: {data.quantity} Items</h4>
                                <h4>Order Placed: {dateTime.toLocaleDateString()}</h4>
                                <h4>Placed Time: {dateTime.toLocaleTimeString('en-US')}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CustomModal;