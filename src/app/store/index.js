import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import cartReducer from './reducers/cart';
import topSalesReducer from './reducers/topSales';
import catalogReducer from './reducers/catalog';
import itemReducer from './reducers/item';
import orderReducer from './reducers/order';

const rootReducer = combineReducers({
    cart: cartReducer,
    topSales: topSalesReducer,
    catalog: catalogReducer,
    item: itemReducer,
    order: orderReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
