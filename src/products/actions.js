export const FETCH_PRODUCT = 'FETCH_PRODUCT'
export const fetchProductAction = (products) => {
    return {
        type: 'FETCH_PRODUCT',
        payload: products
    }
}

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const deleteProductAction = (products) => {
    return {
        type: 'DELETE_PRODUCT',
        payload: products
    }
}

export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';//検索機能
export const updateProduct = (products) => {
    return {
        type: 'UPDATE_PRODUCT',
        payload: products
    }
}

export const RESET_PRODUCT = 'RESET_PRODUCT';
export const resetProduct = (products) => {
    return {
        type: 'RESET_PRODUCT',
        payload: products
    }
}