import { connectRouter, routerMiddleware } from 'connected-react-router'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { UserReducer } from '../users/reducer'
import { ProductsReducer } from '../products/reducer'
import { History } from 'history'

const teststore = (history: History<unknown>) => {
  //reducerが入る
  return createStore(
    combineReducers({
      router: connectRouter(history),
      products: ProductsReducer,
      users: UserReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk),
  )
}

export default teststore
