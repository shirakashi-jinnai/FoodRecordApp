import *as Actions from './actions'
import initialState from '../store/initialState'

//reducerの役目はactionとoldstateを引数にnewstateを生成する
export const UserReducer = (state = initialState.users, action) => {
    switch (action.type) {
        case Actions.USERS_TEST:
            return { ...state, ...action.payload };//ation.payloadをスプレッド構文にするのはまるっきり新しいオブジェクトにするため
        case Actions.USERS_LOGIN:
            return { ...state, ...action.payload }
        case Actions.USERS_LOGOUT:
            return { ...state, ...action.payload }
        case Actions.ADD_FAVORITELISTS:
            return {
                ...state,
                favoriteLists: [...action.payload]
            }
        case Actions.ADD_FAVORITEITEM:
            return {
                ...state,
                favoriteItem: [...action.payload]
            }
        default:
            return state
    }
}