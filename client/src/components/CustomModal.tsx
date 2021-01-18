import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getItems } from '../redux/actions/items'
import { AppStateType } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux';
import Items from './Items';

export default function CustomModal(props: any) {
    const dispatch = useDispatch();
    useEffect(() => {
        const itemList = props.order?.items.map((data: any) => (data.id));
        if (itemList?.length) dispatch(getItems(itemList));
    }, [dispatch]);

    const productList = useSelector((state: AppStateType) => state.itemReducer.items);
    const isLoading = useSelector((state: AppStateType) => state.itemReducer.isLoading);

    return (
        <Modal
            {...props} size="lg"
            aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>
                <h2> Products Details: </h2>
                {isLoading ? <h2>Loading...</h2> :
                    <Items order={props.order}
                        products={productList} />}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}