import { Router } from 'express';
import items from "./items";
import orders from "./orders";

const apiRouter = () => {
  const routes = Router();

  const itemsRouter = items();
  const ordersRouter = orders();

  routes.use("/api/items", itemsRouter);
  routes.use("/api/orders", ordersRouter);
  return routes;
};

export default apiRouter;