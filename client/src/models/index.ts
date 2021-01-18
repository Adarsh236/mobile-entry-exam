type CustomerType = {
    name: string;
}

type BillingInfoType = {
    status: string;
}

type PriceType = {
    formattedTotalPrice: string;
}

type ItemsType = {
    id: string;
    name: string;
    quantity: number;
}

export type OrderType = {
    id: number;
    createdDate: string;
    fulfillmentStatus: string;
    billingInfo: BillingInfoType;
    customer: CustomerType;
    itemQuantity: number;
    price: PriceType;
    items: ItemsType[];
}

export type ItemType = {
    id: string;
    name: string;
    price: number;
    image: string;
}

export type FilterType = {
    id: number;
    name: string;
    checked: boolean;
    status: string;
}