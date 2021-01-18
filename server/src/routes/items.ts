import { Router } from 'express';
import ItemsController from '../controllers/items';

const ItemsRouter = () => {
    const router = Router();
    const controller = ItemsController();
    router
        .route('/')
        .get(controller.getItems)
    return router;
};

export default ItemsRouter;
