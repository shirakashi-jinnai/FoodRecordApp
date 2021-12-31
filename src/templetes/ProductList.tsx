import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/Products/ProductCard'
import { fetchProducts } from '../reducks/products/operating'
import { getProductList } from '../reducks/products/selectors'
import { getUserName } from '../reducks/users/selectors'

const ProductList = () => {
  const dispatch = useDispatch()
  const selector: any = useSelector((state) => state)
  const products: Product[] = getProductList(selector)
  const username: string = getUserName(selector)

  const query: string = selector.router.location.search //?の後のpathを表示する
  // const q = window.location.search//これでも可

  const category = /^\?category=/.test(query)
    ? query.split('?category=')[1]
    : ''

  useEffect(() => {
    dispatch(fetchProducts(category))
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
