import { FilterType } from './../components/DropdownFilters';
import { OrderType } from '../redux/actions/orders'

export const getAssetByStatus = (status: string) => {
    switch (status) {
        case 'fulfilled':
            return require('../assets/package.png');
        case 'not-fulfilled':
            return require('../assets/pending.png');
        case 'canceled':
            return require('../assets/cancel.png');
        case 'paid':
            return require('../assets/paid.png');
        case 'not-paid':
            return require('../assets/not-paid.png');
        case 'refunded':
            return require('../assets/refunded.png');
    }
}

export const getFilteredData = (orders: OrderType[], selectedFilter: FilterType[] | undefined, search: string) => {
    let filteredOrders: OrderType[] = [];
    let applyFilter = false;

    orders.filter((order) => (
        selectedFilter?.filter((data) => {
            if (data.checked === true) {
                if (data.name.toLocaleLowerCase() === order.fulfillmentStatus.toLocaleLowerCase() ||
                    data.name.toLocaleLowerCase() === order.billingInfo.status.toLocaleLowerCase()) {
                    filteredOrders.push(order);
                }
                applyFilter = true;
            }
        })
    ));

    if (!applyFilter) filteredOrders = orders;

    const filterBySearch = filteredOrders?.filter((order) => (order.customer.name.toLowerCase() + order.id)
        .includes(search.toLowerCase()));

    return filterBySearch.sort((a, b) => b.id - a.id);
}

export const getNotDeliveredOrders = (orders: OrderType[]) => {
    let filteredOrders: OrderType[] = [];

    orders.filter((order) => {
        if (order.fulfillmentStatus.toLocaleLowerCase() === "not-fulfilled") {
            filteredOrders.push(order);
        }
    })

    if (filteredOrders.length === 0) filteredOrders = [];

    return filteredOrders.sort((a, b) => b.id - a.id);
}