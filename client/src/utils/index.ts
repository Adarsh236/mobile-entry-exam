import { FilterType, OrderType } from "../models";

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
            //Check any filter selected
            if (data.checked === true) {
                if (data.name.toLocaleLowerCase() === order.fulfillmentStatus.toLocaleLowerCase() ||
                    data.name.toLocaleLowerCase() === order.billingInfo.status.toLocaleLowerCase()) {
                    filteredOrders.push(order);
                }
                applyFilter = true;
            }
        })
    ));
    // if no filter selected then list will be same
    if (!applyFilter) filteredOrders = orders;

    const filterBySearch = filteredOrders?.filter((order) => {
        const searchBy = order.customer.name.toLowerCase() + order.id;
        const searchText = search.toLowerCase();

        if (searchBy.includes(searchText)) {
            return true;
        }

        const find = order.items.filter((item) => {
            if (item.name.toLowerCase().includes(searchText)) return true;
            else return false;
        })
        if (find.length) return true;
    });

    return filterBySearch.sort((a, b) => b.id - a.id);
}

export const getNotDeliveredOrders = (orders: OrderType[]) => (
    orders.filter((order) =>
        (order.fulfillmentStatus.toLocaleLowerCase() === "not-fulfilled"))
        .sort((a, b) => b.id - a.id)
)