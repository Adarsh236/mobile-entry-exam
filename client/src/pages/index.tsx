import React, { useState, useEffect } from 'react';
import '../App.scss';
import { Nav, Navbar, Dropdown, ButtonGroup, Badge, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FilterAndSearch from '../components/FilterAndSearch';
import Orders from './Orders';
import { getNotDeliveredOrders } from '../utils';
import { getOrders } from '../redux/actions/orders'
import { AppStateType } from '../redux/store'
import { OrderType } from '../models';

export default function Home() {
    const dispatch = useDispatch();

    //Call API and update list
    useEffect(() => { dispatch(getOrders()); }, [dispatch]);

    const orderList = useSelector((state: AppStateType) => state.orderReducer.orders);
    const isLoading = useSelector((state: AppStateType) => state.orderReducer.isLoading);

    const [filteredOrderList, setFilteredOrderList] = useState<OrderType[]>();

    const notDelivered: OrderType[] = orderList ? getNotDeliveredOrders(orderList) : [];

    //First time the list will be empty
    if (filteredOrderList === undefined && orderList?.length > 0) setFilteredOrderList(orderList);

    const dropdownMenu = () => (
        <Dropdown.Menu className="dropdown-menu">
            {notDelivered?.map((type, i) => (
                <Dropdown.Item key={i} eventKey={i + ''}>
                    {++i}) Order ID: {type.id}
                </Dropdown.Item>))
            }
        </Dropdown.Menu>
    )

    return (
        <main>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home"><h1>Wix Entry Exam</h1></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Orders</Nav.Link>
                        <Nav.Link href="/home">Adarsh Verma</Nav.Link>
                    </Nav>
                    <Dropdown as={ButtonGroup} className="float-right">
                        <Button variant="info">Not Delivered <Badge variant="light">{notDelivered.length}</Badge></Button>
                        <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
                        {dropdownMenu()}
                    </Dropdown>
                </Navbar.Collapse>
            </Navbar>

            <h3>Orders</h3>

            {isLoading ? null :
                <header>
                    <FilterAndSearch
                        orderList={orderList}
                        onUpdate={(lists: OrderType[]) => setFilteredOrderList(lists)} />
                </header>
            }

            {(!isLoading && filteredOrderList !== undefined) ? <Orders filteredOrderList={filteredOrderList} /> : <h2>Loading...</h2>}
        </main>
    )
}
