import { Router } from 'express';
import OrdersController from '../controllers/orders';

const OrdersRouter = () => {
    const router = Router();
    const controller = OrdersController();
    router
        .route('/')
        .get(controller.getOrders)
        .put(controller.putOrder)
    return router;
};

export default OrdersRouter;
