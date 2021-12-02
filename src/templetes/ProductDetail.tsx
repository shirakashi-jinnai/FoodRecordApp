import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  CommentArea,
  ImageSwiper,
  PriceBox,
  StoresBox,
} from '../components/Products'
import { db } from '../firebase'
import { getProductList } from '../products/selectors'

const useStyles = makeStyles((theme: Theme) => ({
  swiper: {
    [theme.breakpoints.down('sm')]: {
      width: 350,
      height: 350,
      margin: '0 auto',
    },
    [theme.breakpoints.up('md')]: {
      width: 400,
      height: 400,
    },
  },
  detail: {
    [theme.breakpoints.down('sm')]: {
      width: 350,
      height: 350,
      margin: '0 auto',
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: 100,
      width: 400,
    },
  },
  store: {
    marginTop: 50,
  },
}))

const ProductDetail = () => {
  const classes = useStyles()
  let id = window.location.pathname.split('/product/detail/')[1]
  const [product, setProduct] = useState<any>('')
  const selector = useSelector((state) => state)
  const getProduct = getProductList(selector)

  useEffect(() => {
    if (id) {
      db.collection('products')
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data()
          setProduct(data)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProduct])

  return (
    <section className="section-wrapin">
      <h1>商品詳細</h1>
      {product && (
        <>
          <div className="grid-row">
            <div className={classes.swiper}>
              <ImageSwiper images={product.images} />
            </div>
            <div className={classes.detail}>
              <h1>商品名：{product.name}</h1>
              <p>説明：{product.description}</p>
              <PriceBox prices={product.prices} />
              <div className={classes.store}>
                <h1>店名：{product.storeName}</h1>
                <StoresBox stores={product.stores} />
              </div>
            </div>
          </div>
          <CommentArea comments={product.comments} />
        </>
      )}
    </section>
  )
}

export default ProductDetail
