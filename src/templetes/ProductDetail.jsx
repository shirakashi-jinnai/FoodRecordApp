import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { CommentArea, ImageSwiper, PriceBox, StoresBox } from '../components/Products'
import { db } from '../firebase'

const useStyles = makeStyles(theme => ({
    swiper: {
        [theme.breakpoints.down('sm')]: {
            width: 350,
            height: 350,
            margin: '0 auto'
        },
        [theme.breakpoints.up('md')]: {
            width: 400,
            height: 400
        },
    },
    detail: {
        [theme.breakpoints.down('sm')]: {
            width: 350,
            height: 350,
            margin: '0 auto'
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: 100,
            width: 400
        },

    },
    store: {
        marginTop: 50
    }
}))

const ProductDetail = () => {
    const classes = useStyles();
    let id = window.location.pathname.split('/product/detail/')[1]

    const [product, setProduct] = useState();

    useEffect(() => {
        if (id) {
            db.collection('products').doc(id).get()
                .then(snapshot => {
                    const data = snapshot.data()
                    setProduct(data)
                })
        }
    }, [])

    console.log(product)

    return (

        <section className='section-wrapin'>
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
                    <CommentArea />
                </>
            )}
        </section>
    )
}

export default ProductDetail