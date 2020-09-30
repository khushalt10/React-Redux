import {createStore, combineReducers, applyMiddleware} from 'redux'
import { compose } from 'redux';
import thunk from 'redux-thunk' 
import {productsReducer} from './reducers/productReducers';

const initialState = {};
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const store = createStore(combineReducers({
    products: productsReducer,
}),
    initialState,
    composeEnhancers(applyMiddleware(thunk))
)

export default store;