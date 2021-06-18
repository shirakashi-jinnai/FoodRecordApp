import React from 'react'
import { Route, Switch } from 'react-router'
import Auth from './Auth'
import { CommentForm, FavoritesList, ProductDetail, ProductEdit, ProductList, Reset, Signin, Signup } from './templetes'

const Router = () => {
    return (
        <Switch>
            <Route path='/reset' component={Reset} />
            <Route path='/signup' component={Signup} />
            <Route path='/signin' component={Signin} />
            <Auth>
                <Route exact path='(/)?' component={ProductList} />
                <Route path='/product/edit(/:id)?' component={ProductEdit} />
                <Route path='/product/detail(/:id)?' component={ProductDetail} />
                <Route path='/favorite(/:id)?' component={FavoritesList} />
            </Auth>
        </Switch>
    )
}

export default Router