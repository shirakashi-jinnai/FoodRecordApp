import { FirebaseTimestamp } from '../../firebase'

export const USERS_TEST = 'USERS_TEST'
export const usersTest = (users) => {
  return {
    type: 'USERS_TEST',
    payload: {
      username: users.username,
      id: users.id,
    },
  }
}

export const USERS_LOGIN = 'USERS_LOGIN'
export const signinAction = (users) => {
  //actionはstoreを変更するためにdispatchによって発行される
  const timestamp = FirebaseTimestamp.now()
  return {
    type: 'USERS_LOGIN',
    payload: {
      isSigndin: true,
      username: users.username,
      id: users.uid,
      signinTime: timestamp,
      avatar: users.avatar,
    },
  }
}

export const USERS_LOGOUT = 'USERS_LOGOUT'
export const usersLogout = () => {
  return {
    type: 'USERS_LOGOUT',
    payload: {
      isSigndin: false,
      username: '',
      id: '',
      signinTime: '',
      avatar: '',
    },
  }
}

export const ADD_FAVORITELISTS = 'ADD_FAVORITELISTS'
export const addFavoriteLists = (list) => {
  return {
    type: 'ADD_FAVORITELISTS',
    payload: list,
  }
}

export const ADD_FAVORITEITEM = 'ADD_FAVORITEITEM'
export const addFavoriteItem = (item) => {
  return {
    type: 'ADD_FAVORITEITEM',
    payload: item,
  }
}

export const DELTE_FAVORITEITEM = 'DELTE_FAVORITEITEM'
export const deleteFavoriteItem = (item) => {
  return {
    type: 'DELTE_FAVORITEITEM',
    payload: item,
  }
}

export const UPDATE_PROFILE_ACTION = 'UPDATE_PROFILE_ACTION'
export const updateProfileAction = (users) => {
  return {
    type: 'UPDATE_PROFILE_ACTION',
    payload: {
      username: users.username,
      avatar: users.avatar,
    },
  }
}
