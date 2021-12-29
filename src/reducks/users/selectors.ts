import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const userSelector = (state) => state.users

export const getuserFvoriteItem = createSelector(
  [userSelector],
  (state) => state.favoriteItem,
)

export const getUserFavorites = createSelector(
  [userSelector],
  (state) => state.favoriteLists,
)

export const getUserName = createSelector(
  [userSelector],
  (state) => state.username,
)

export const getUserId = createSelector([userSelector], (state) => state.id)

export const getLoginTIme = createSelector(
  [userSelector],
  (state) => state.signinTime,
)

export const getIssigndin = createSelector(
  [userSelector],
  (state) => state.isSigndin,
)

export const getUserAvatar = createSelector(
  [userSelector],
  (state) => state.avatar,
)
