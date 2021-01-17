import React, { Component, useEffect, useState } from 'react';
import { Col, Row, Container, ListGroup, Card, ListGroupItem } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { bindActionCreators } from 'redux';
import { OrderType, getOrders } from '../redux/actions/orders'
import { AppStateType, AppActionsType } from '../redux/store'
import { getAssetByStatus, getFilteredData } from '../utils';
import CustomModal from '../components/CustomModal';

interface IProps { }

interface ILinkStateProps {
    orders: OrderType[];
}

interface ILinkDispatchProps {
    getOrders: () => void;
}

type LinkPropsType = IProps & ILinkStateProps & ILinkDispatchProps;

let FilterOption = [
    {
        "id": 1,
        "name": "fulfilled",
        "checked": false,
        "status": "fulfillmentStatus"
    }, {
        "id": 2,
        "name": "not-fulfilled",
        "checked": false,
        "status": "fulfillmentStatus"
    }
    , {
        "id": 3,
        "name": "canceled",
        "checked": false,
        "status": "billingInfo"

    }
    , {
        "id": 4,
        "name": "paid",
        "checked": false,
        "status": "billingInfo"
    }
    , {
        "id": 5,
        "name": "not-paid",
        "checked": false,
        "status": "billingInfo"
    }, {
        "id": 6,
        "name": "refunded",
        "checked": false,
        "status": "billingInfo"
    }
]

function Orders(props: any) {
    const dispatch = useDispatch();

    //useEffect(() => { dispatch(getOrders()); }, [dispatch]);

    const orderList = useSelector((state: AppStateType) => state.orderReducer.orders);
    const isLoading = useSelector((state: AppStateType) => state.orderReducer.isLoading);


    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<OrderType>();

    const renderOrders = (orders: OrderType[]) => (
        <div className='orders'>
            {orders?.map((order, i) => (
                <div className={'orderCard'}>
                    <div className={'generalData'}>
                        <h6 color="red">NO: {i}</h6>
                        <h6>{order.id}</h6>
                        <h4>{order.customer.name}</h4>
                        <h5>Order Placed: {new Date(order.createdDate).toLocaleDateString()}</h5>
                    </div>
                    <div className={'fulfillmentData'}>
                        <h4>{order.itemQuantity} Items</h4>
                        <img src={getAssetByStatus(order.fulfillmentStatus)} />
                        {order.fulfillmentStatus !== 'canceled' &&
                            <a onClick={async (e) => {
                            }}>Mark as {order.fulfillmentStatus === 'fulfilled' ?
                                'Not Delivered' : 'Delivered'}</a>
                        }
                    </div>
                    <div className={'paymentData'}>
                        <h4>{order.price.formattedTotalPrice}</h4>
                        <img src={getAssetByStatus(order.billingInfo.status)} />
                    </div>
                    <div className={'button'}>
                        <a onClick={async (e) => {
                            setSelectedOrder(order)
                            setShowModal(true);
                        }}>View More</a>
                    </div>
                </div>
            ))}

            <CustomModal
                show={showModal}
                onHide={() => setShowModal(false)}
                order={selectedOrder}
            />
        </div>
    )
    console.log(props);
    return (
        <main>
            {props.filteredOrderList ? <div className='results'>Showing {props.filteredOrderList.length} results</div> : null}
            {props.filteredOrderList ? renderOrders(props.filteredOrderList) : <h2>Loading...</h2>}
        </main>
    )

}

/*class Orders extends Component<LinkPropsType> {

    state = {
        search: '',
        filter: FilterOption,
        showModal: false,
        selectedOrder: []
    };


    async componentDidMount() {
        await this.props.getOrders();
    }

    render() {
        const { orders } = this.props;
        return (
            <main>
                {orders ? <div className='results'>Showing {orders.length} results</div> : null}
                {orders ? this.renderOrders(orders) : <h2>Loading...</h2>}
            </main>
        )
    }


    renderOrders = (orders: OrderType[]) => {
        const { filter, search, showModal, selectedOrder } = this.state;
        const filterBySearch = getFilteredData(orders, filter, search);

        return (
            <div className='orders'>
                {filterBySearch?.map((order, i) => (
                    <div className={'orderCard'}>
                        <div className={'generalData'}>
                            <h6 color="red">NO: {i}</h6>
                            <h6>{order.id}</h6>
                            <h4>{order.customer.name}</h4>
                            <h5>Order Placed: {new Date(order.createdDate).toLocaleDateString()}</h5>
                        </div>
                        <div className={'fulfillmentData'}>
                            <h4>{order.itemQuantity} Items</h4>
                            <img src={getAssetByStatus(order.fulfillmentStatus)} />
                            {order.fulfillmentStatus !== 'canceled' &&
                                <a onClick={async (e) => {
                                    /* await api2.getOrders().then((r) => {
                                         console.log("-------------");
                                         console.log(r);
                                     });
 
                                     await api2.updateOrder(order.id, order.fulfillmentStatus).then((res) => {
 
                                         this.setState({
                                             orders: res
                                         });
                                     });*//*
console.log(this.props.orders);
await this.props.getOrders();
console.log("-------------1");
console.log(this.props.orders);
console.log("-------------");
console.log(filterBySearch);
console.log("-------------2");

}}>Mark as {order.fulfillmentStatus === 'fulfilled' ? 'Not Delivered' : 'Delivered'}</a>
}
</div>
<div className={'paymentData'}>
<h4>{order.price.formattedTotalPrice}</h4>
<img src={getAssetByStatus(order.billingInfo.status)} />
</div>
<div className={'button'}>


<a onClick={async (e) => this.setState({
selectedOrder: order,
showModal: true
})}>View More</a>

</div>

</div>
))}

<CustomModal
show={showModal}
onHide={() => this.setState({ showModal: false })}
order={selectedOrder}
/>
</div>
)
};

mod = (orders: OrderType[]) => {
return;
}
}*/

const mapStateToProps = (state: AppStateType): ILinkStateProps => ({
    orders: state.orderReducer.orders,
});

const mapDispatchToProps = (
    dispatch: ThunkDispatch<AppStateType, {}, AppActionsType>
) => ({
    getOrders: bindActionCreators(getOrders, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(Orders)
