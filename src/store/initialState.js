import React from 'react'

const initialState = {
    products: {
        list: [],
        searchList: []
    },
    users: {
        favoriteLists: [],
        isSigndin: false,
        username: '',
        id: '',
        signinTime: ''
    }
}

export default initialState;