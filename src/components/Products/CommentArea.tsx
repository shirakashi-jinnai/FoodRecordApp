import { Button, List } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../reducks/products/operating'
import { getUserName } from '../../reducks/users/selectors'
import { CommentModal, CommentPreview } from './index'

const CommentArea = (props: { comments?: Comment[] }) => {
  const dispatch = useDispatch()
  const productId = window.location.pathname.split('/product/detail/')[1]
  const selector = useSelector((state) => state)
  const userName = getUserName(selector)
  const [open, setOpen] = useState(false)

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen])
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  useEffect(() => {
    const products = fetchProducts()
    dispatch(products)
  }, [handleClose])

  return (
    <div>
      <h1>コメント{props.comments ? props.comments.length : 0}件</h1>
      <Button variant="contained" onClick={handleOpen}>
        コメントを投稿する
      </Button>
      <List>
        {props.comments &&
          props.comments.map((comment: Comment, i: number) => (
            <CommentPreview comment={comment} key={i} />
          ))}
      </List>
      <CommentModal
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        id={productId}
        userName={userName}
      />
    </div>
  )
}

export default CommentArea
