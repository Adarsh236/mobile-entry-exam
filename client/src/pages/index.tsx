import React, { useState, useEffect } from 'react';
import '../App.scss';
import { Nav, Navbar, Dropdown, ButtonGroup, Badge, Button } from 'react-bootstrap';
import DropdownFilters from '../components/DropdownFilters';
import Orders from './Orders';
import Items from './Items';
import { getNotDeliveredOrders } from '../utils';
import { OrderType, getOrders } from '../redux/actions/orders'
import { AppStateType, AppActionsType } from '../redux/store'
import { useDispatch, useSelector, connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';

interface IProps { }

interface ILinkStateProps {
    orders: OrderType[];
}

interface ILinkDispatchProps {
    getOrders: () => void;
}

type LinkPropsType = IProps & ILinkStateProps & ILinkDispatchProps;

function Home() {
    const dispatch = useDispatch();

    useEffect(() => { dispatch(getOrders()); }, [dispatch]);

    const orderList = useSelector((state: AppStateType) => state.orderReducer.orders);
    const isLoading = useSelector((state: AppStateType) => state.orderReducer.isLoading);

    const [showOrders, setShowOrders] = useState<boolean>(true);
    const [filteredOrderList, setFilteredOrderList] = useState<OrderType[]>();

    const notDelivered: OrderType[] = orderList ? getNotDeliveredOrders(orderList) : [];

    if (filteredOrderList === undefined && orderList.length > 0) setFilteredOrderList(orderList);

    return (
        <main>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home"><h1>Wix Entry Exam</h1></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/home" onSelect={(e: any) => setShowOrders(true)}>Orders</Nav.Link>
                        <Nav.Link href="#link" onSelect={(e: any) => setShowOrders(false)}>Items</Nav.Link>
                    </Nav>

                    <Dropdown as={ButtonGroup} className="float-right">
                        <Button variant="info">Not Delivered <Badge variant="light">{notDelivered.length}</Badge></Button>
                        <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
                        <Dropdown.Menu>
                            {
                                notDelivered?.map((type, i) => (
                                    <Dropdown.Item eventKey={i + ''}>
                                        {++i}) Order ID: {type.id}
                                    </Dropdown.Item>))
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Collapse>
            </Navbar>

            <h3>{showOrders ? "Orders" : "Items"}</h3>

            {isLoading ? null :
                <header>
                    <DropdownFilters
                        showOrders={showOrders}
                        orderList={orderList}
                        onUpdate={(lists: OrderType[]) => setFilteredOrderList(lists)} />
                </header>
            }

            {showOrders ? <Orders filteredOrderList={filteredOrderList} /> : <Items />}
        </main>
    )
}

const mapStateToProps = (state: AppStateType): ILinkStateProps => ({
    orders: state.orderReducer.orders,
});

const mapDispatchToProps = (
    dispatch: ThunkDispatch<AppStateType, {}, AppActionsType>
) => ({
    getOrders: bindActionCreators(getOrders, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
