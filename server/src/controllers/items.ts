import { ItemType } from "../modals";
const { products } = require('../entities/products.json');

export default () => {
    const getItems = (req: any, res: any, next: any) => {
        try {
            const queryList = req.query.itemId ? req.query.itemId.toString().split(",") : [];

            let productList: any = [];
            let expensiveProduct = 0;
            queryList.forEach((itemId: any) => {
                const product = products[itemId];
                if (product !== undefined) {
                    if (product.price > expensiveProduct) {
                        expensiveProduct = product.price;
                    }
                    product.id = itemId;
                    productList.push(product);
                }
            })

            const updatedList: ItemType[] = productList.map((data: any) => {
                let product = {
                    id: data.id,
                    name: data.name,
                    price: data.price,
                    image: ''
                }
                if (data.price >= (expensiveProduct)) product.image = data.images.original;
                else if (data.price >= (expensiveProduct / 2)) product.image = data.images.large;
                else if (data.price >= (expensiveProduct / 3)) product.image = data.images.medium;
                else product.image = data.images.small;
                return product;
            });

            res.send(updatedList);

        } catch (error) {
            console.log(error.message);
        }
    };

    return {
        getItems
    };
};