import { Button, Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { push } from 'connected-react-router'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductList } from '../../products/selectors'
import { getUserName } from '../../users/selectors'
import { CommentModal, CommentPreview } from './index'



const CommentArea = () => {
    const dispatch = useDispatch();
    const productId = window.location.pathname.split('/product/detail/')[1]
    const selector = useSelector(state => state)
    const userName = getUserName(selector)
    const products = getProductList(selector);
    const [open, setOpen] = useState(false);

    const handleOpen = useCallback(() => {
        setOpen(true)
    }, [setOpen])
    const handleClose = useCallback(() => {
        setOpen(false)
    }, [setOpen])
    console.log(products)
    console.log(userName)

    return (
        <div>
            <h1>コメント一覧</h1>
            <Button variant="contained" onClick={handleOpen} >コメントを投稿する</Button>
            {/* {products.productId.comments.map(comment => (<CommentPreview comment={comment} />))} */}
            <CommentModal handleOpen={handleOpen} handleClose={handleClose} open={open} id={productId} userName={userName} />
        </div>
    )
}

export default CommentArea