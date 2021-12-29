import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listenAuthState } from './reducks/users/operating'
import { getIssigndin } from './reducks/users/selectors'

const Auth = (props: { children: any }) => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const isSigndin = getIssigndin(selector)

  useEffect(() => {
    if (!isSigndin) {
      dispatch(listenAuthState())
    }
  }, [])

  return isSigndin ? props.children : ''
}

export default Auth
