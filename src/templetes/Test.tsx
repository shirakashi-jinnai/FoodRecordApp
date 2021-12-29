import { push } from 'connected-react-router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signinAction, usersTest, usersLogout } from '../reducks/users/actions'
import { signout } from '../reducks/users/operating'
import {
  getLoginTIme,
  getUserId,
  getUserName,
} from '../reducks/users/selectors'
import ProductEdit from './ProductEdit'

const Test = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const name = getUserName(selector)
  const id = getUserId(selector)

  const today = new Date()
  const time =
    today.getFullYear() +
    '年' +
    today.getMonth() +
    1 +
    '月' +
    today.getDate() +
    '日' +
    today.getHours() +
    '時' +
    today.getMinutes() +
    '分'

  useEffect(() => {}, [])

  return (
    <div>
      <button onClick={() => dispatch(signout())}>logout</button>
      <button onClick={() => dispatch(push('/product/edit'))}>商品追加</button>
      <p>id:{id}</p>
      <p>username:{name}</p>
    </div>
  )
}

export default Test
