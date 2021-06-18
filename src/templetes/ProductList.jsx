import { makeStyles } from '@material-ui/styles'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/Products/ProductCard'
import { db } from '../firebase'
import { fetchProducts } from '../products/operating'
import { getProductList } from '../products/selectors'
import { getUserId, getUserName } from '../users/selectors'
import loading from '../asetts/img/loading.gif'
import { addProductsToFavorite, fetchFavoriteList } from '../users/operating'


const ProductList = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state)
    const products = getProductList(selector);
    const username = getUserName(selector);


    const query = selector.router.location.search;//?の後のpathを表示する
    // const q = window.location.search//これでも可

    const category = /^\?category=/.test(query) ? query.split('?category=')[1] : '';

    useEffect(() => {
        dispatch(fetchProducts(category))
    }, [query])


    return (
        <section className='section-wrapin'>
            <h1>商品一覧</h1>
            <h1>ようこそ{username}</h1>
            <div className="grid-row">
                {products.length > 0 ? products.map((product, i) => (
                    <ProductCard product={product} key={i} />
                )) : (
                    <p>商品が見つかりませんでした</p>
                )}
            </div>
        </section>
    )

}

export default ProductList