type UrlType = {
    BASE_URL: string;
    ORDERS: string;
    ITEMS: string;
}

const Urls: UrlType = {
    BASE_URL: 'http://localhost:3232/api',
    ORDERS: '/orders',
    ITEMS: '/items',
};

export default Urls;