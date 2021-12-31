import * as Actions from './actions'
import initialState from '../store/initialState'

// type Action = {
//   type: string
//   payload: Product[]
// }

//reducerの役目はactionとoldstateを引数にnewstateを生成する
export const ProductsReducer = (
  state = initialState.products,
  action: Action<Product[]>,
) => {
  switch (action.type) {
    case Actions.FETCH_PRODUCT:
      return {
        ...state,
        list: [...action.payload],
        searchList: [...action.payload],
      }
    case Actions.DELETE_PRODUCT:
      return {
        ...state,
        list: [...action.payload],
        searchList: [...action.payload],
      }
    case Actions.UPDATE_PRODUCT:
      return {
        ...state,
        list: [...action.payload],
      }
    case Actions.RESET_PRODUCT:
      return {
        ...state,
        list: [...action.payload],
      }
    default:
      return state
  }
}
