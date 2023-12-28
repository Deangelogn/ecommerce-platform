import { legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux'
import { thunk }  from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducers, producDetailsReducer } from './reducers/productReducers'


const reducer = combineReducers({
    productList: productListReducers,
    productDetails: producDetailsReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;