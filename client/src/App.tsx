import React from 'react';
import { Provider } from 'react-redux'
import { store } from './redux/store'
import './App.scss';
import Home from './pages'

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Home />
		</Provider>
	);
}

export default App

/*import React from 'react';
import './App.scss';
import { createApiClient, Order } from './api';
import { CustomFilter } from './components/CustomFilter';
import { Toggle } from './components/partials/Toggle';
import { List } from './components/partials/List';
import { Item } from './components/partials/Item';
import { Filter1 } from './components/Filter1';
import { Dropdown, DropdownButton, FormControl } from 'react-bootstrap';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import { type } from 'os';
import ApiService from './api/ApiService';

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

 export class App extends React.PureComponent<{}, AppState> {

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
					<Container>
						<Row>
							<Col sm={8}>
								{this.customSearch()}
							</Col>
							<Col sm={4}>{this.customFilter3()}</Col>
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
		let filteredOrders: Order[] = [];

		let filterByDropdown = orders.filter((order) => {
			let findOrder = filter?.filter((data) => {
				if (data.checked === true) {
					if (data.name.toLocaleLowerCase() === order.fulfillmentStatus.toLocaleLowerCase() ||
						data.name.toLocaleLowerCase() === order.billingInfo.status.toLocaleLowerCase()) {
						return true;
					}
				}
			});
			if (findOrder?.length) return true;
		});

		if (filterByDropdown.length > 0) filteredOrders.push(...filterByDropdown);
		else filteredOrders = orders;

		const filterBySearch = filteredOrders?.filter((order) => (order.customer.name.toLowerCase() + order.id)
			.includes(search.toLowerCase()));

		filterBySearch.sort((a, b) => a.id - b.id);

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
							<img src={App.getAssetByStatus(order.fulfillmentStatus)} />
							{order.fulfillmentStatus !== 'canceled' &&
								<a onClick={async (e) => {
									await api2.getOrders().then((r) => {
										console.log("-------------");
										console.log(r);
									});

									await api2.updateOrder(order.id, order.fulfillmentStatus).then((res) => {

										this.setState({
											orders: res
										});
									});

								}}>Mark as {order.fulfillmentStatus === 'fulfilled' ? 'Not Delivered' : 'Delivered'}</a>
							}
						</div>
						<div className={'paymentData'}>
							<h4>{order.price.formattedTotalPrice}</h4>
							<img src={App.getAssetByStatus(order.billingInfo.status)} />
						</div>

					</div>
				))}
			</div>
		)
	};

	static getAssetByStatus(status: string) {
		switch (status) {
			case 'fulfilled':
				return require('./assets/package.png');
			case 'not-fulfilled':
				return require('./assets/pending.png');
			case 'canceled':
				return require('./assets/cancel.png');
			case 'paid':
				return require('./assets/paid.png');
			case 'not-paid':
				return require('./assets/not-paid.png');
			case 'refunded':
				return require('./assets/refunded.png');
		}
	}
}

export default App; */
