import React, { Component } from 'react';
import '../App.scss';
import { createApiClient, Order } from '../api';
import { Dropdown, DropdownButton, FormControl } from 'react-bootstrap';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import ApiService from '../api/ApiService';

import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { bindActionCreators } from 'redux';
import { OrderType, getOrders } from '../redux/actions/orders'
import { AppStateType, AppActionsType } from '../redux/store'
import DropdownFilters from '../components/DropdownFilters';
import SearchBox from '../components/SearchBox'
import { getAssetByStatus, getFilteredData } from '../utils';
interface IProps { }

interface ILinkStateProps {
    orders: OrderType[];
}

interface ILinkDispatchProps {
    getOrders: () => void;
}

type LinkPropsType = IProps & ILinkStateProps & ILinkDispatchProps;

const mapStateToProps = (state: AppStateType): ILinkStateProps => ({
    orders: state.orderReducer.orders,
});

const mapDispatchToProps = (
    dispatch: ThunkDispatch<AppStateType, {}, AppActionsType>
) => ({
    getOrders: bindActionCreators(getOrders, dispatch),
});



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

export type Filter = {
    id: number;
    name: string;
    checked: boolean;
    status: string;
}


//--------------------
export type AppState = {
    orders?: Order[],
    checked: boolean,
    search: string,
    filter?: Filter[];

}

const api = createApiClient();
const api2 = ApiService();

//export class App extends React.PureComponent<{}, AppState,Props,State> {
class OrdersPage extends Component<LinkPropsType> {

    state: AppState = {
        search: '',
        checked: true,
        filter: FilterOption,
    };

    searchDebounce: any = null;

    async componentDidMount() {
        this.setState({
            orders: await api.getOrders()
        });
    }

    onSearch = async (value: string, newPage?: number) => {

        clearTimeout(this.searchDebounce);

        this.searchDebounce = setTimeout(async () => {
            this.setState({
                search: value
            });
        }, 300);
    };


    render() {
        const { orders } = this.state;

        return (
            <main>
                <h1>Orders</h1>
                <header>
                    <Container fluid>
                        <Row>
                            <Col sm={3} md={9}>
                                {/*  {this.customSearch()} */}
                                <SearchBox />
                            </Col>
                            <Col sm="auto" md={3}>{this.customFilter3()}</Col>
                            {/* <Col sm="auto" md={3}><DropdownFilters props={this.state.filter} /></Col> */}
                        </Row>
                    </Container>
                </header>
                {orders ? <div className='results'>Showing {orders.length} results</div> : null}
                {orders ? this.renderOrders(orders) : <h2>Loading...</h2>}

            </main>
        )
    }

    customSearch = () => {
        return (
            <InputGroup>
                <FormControl
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => this.onSearch(e.target.value)}
                    aria-describedby="basic-addon1"
                    type="search"
                />
            </InputGroup>
        );
    }

    customFilter3 = () => {
        const handleSelect = (e: any) => {
            let updateList = this.state.filter?.map((data) => {
                if (data.name === e) data.checked = !data.checked;
                return data;
            })
            this.setState({
                filter: updateList
            });
        }

        return (
            <DropdownButton
                alignRight
                title="Select Filter"
                id="dropdown-menu-align-right"
                onSelect={handleSelect}>
                {
                    this.state.filter?.map((type, i) => (
                        <Dropdown.Item eventKey={type.name} active={type.checked}>
                            {type.name}
                        </Dropdown.Item>))
                }
            </DropdownButton>
        );
    }

    renderOrders = (orders: Order[]) => {
        const { filter, search } = this.state;
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
                                     });*/
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

                    </div>
                ))}
            </div>
        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage)
