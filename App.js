import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import productsReducer from './Store/Reducers/Products'
import NavigationContainer from './Navigation/NavigationContainer'
import cartReducer from './Store/Reducers/Cart'
import ordersReducer from './Store/Reducers/Orders'
import authReducer from './Store/Reducers/Auth'
import ReduxThunk from 'redux-thunk'
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
})
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  )
}