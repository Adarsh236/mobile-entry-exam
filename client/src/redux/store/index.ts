import { createStore, applyMiddleware } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { createLogger } from 'redux-logger';
import { rootReducer } from '../reducers'
import { OrdersActionTypes } from '../actions/orders'
import { ItemsActionTypes } from '../actions/items'

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppActionsType = OrdersActionTypes | ItemsActionTypes;

const logger = createLogger();
const middleware = applyMiddleware(thunk as ThunkMiddleware<AppStateType, AppActionsType>, logger);

export const store = createStore<AppStateType, AppActionsType, {}, {}>(rootReducer, middleware);