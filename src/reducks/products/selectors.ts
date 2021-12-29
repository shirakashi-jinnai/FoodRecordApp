import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const productSelector = state => state.products

export const getProductList = createSelector(
    [productSelector],
    state => state.list
)

export const getSearchList = createSelector(
    [productSelector],
    state => state.searchList
)
