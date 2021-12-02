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
        signinTime: '',
        avatar:''
    }
}

export default initialState;