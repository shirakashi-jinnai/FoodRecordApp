import React from 'react'
import { Route, Switch } from 'react-router'
import Auth from './Auth'
import {
  FavoritesList,
  ProductDetail,
  ProductEdit,
  ProductList,
  ProfileEdit,
  Reset,
  Signin,
  Signup,
} from './templetes'

const Router = () => {
  return (
    <Switch>
      <Route path="/reset" component={Reset} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Auth>
        <Route exact path="(/)?" component={ProductList} />
        <Route path="/product/edit(/:id)?" component={ProductEdit} />
        <Route path="/product/detail(/:id)?" component={ProductDetail} />
        <Route path="/favorite(/:id)?" component={FavoritesList} />
        <Route path="/profileedit" component={ProfileEdit} />
      </Auth>
    </Switch>
  )
}

export default Router
