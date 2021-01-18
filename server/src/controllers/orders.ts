import { ItemsType, OrderType } from "../modals";
import { PAGE_SIZE } from "../utils/constants";

const allOrders: any[] = require('../entities/orders.json');
const { products } = require('../entities/products.json');

export default () => {
    const getOrders = (req: any, res: any, next: any) => {
        try {
            const page = <number>(req.query.page || 1);
            const orders: OrderType[] = allOrders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
            while (orders.length > 20) orders.pop();

            const updateList: OrderType[] = orders.map((data) => {
                let newOrder = data;
                data.items.map((data: ItemsType, j: number) => {
                    const product = products[data.id];
                    if (product !== undefined) {
                        newOrder.items[j].name = product.name;
                    }
                });
                return newOrder;
            })

            res.send(updateList);
        } catch (error) {
            console.log(error.message);
        }
    };

    const putOrder = (req: any, res: any, next: any) => {
        try {
            allOrders.forEach((e) => {
                if (e.id === req.body.id) {
                    if (req.body.status === "not-fulfilled") {
                        e.fulfillmentStatus = "fulfilled";
                    }

                    else {
                        e.fulfillmentStatus = "not-fulfilled";
                    }
                }
            });
            const page = <number>(req.query.page || 1);
            const orders: any[] = allOrders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
            res.send(orders);
        } catch (error) {
            console.log(error.message);
        }
    };
    return {
        getOrders,
        putOrder,
    };
};