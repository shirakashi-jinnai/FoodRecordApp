import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/Products/ProductCard'
import { fetchProducts } from '../products/operating'
import { getProductList } from '../products/selectors'
import { getUserName } from '../users/selectors'

const ProductList = () => {
  const dispatch = useDispatch()
  const selector: any = useSelector((state) => state)
  const products = getProductList(selector)
  const username = getUserName(selector)

  const query = selector.router.location.search //?の後のpathを表示する
  // const q = window.location.search//これでも可

  const category = /^\?category=/.test(query)
    ? query.split('?category=')[1]
    : ''

  useEffect(() => {
    dispatch(fetchProducts(category))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <section className="section-wrapin">
      <h1>商品一覧</h1>
      <h1>ようこそ{username}</h1>
      <div className="grid-row">
        {products.length > 0 ? (
          products.map((product, i) => (
            <ProductCard product={product} key={i} />
          ))
        ) : (
          <p>商品が見つかりませんでした</p>
        )}
      </div>
    </section>
  )
}

export default ProductList
