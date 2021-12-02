import {
  Box,
  Fade,
  fade,
  Modal,
  TextField,
  Typography,
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import React, { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addComment, fetchProducts } from '../../products/operating'
import { getUserName } from '../../users/selectors'
import ButtonBox from '../Uikit/ButtonBox'

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: '#fff',
    width: 500,
    height: 'auto',
    borderRadius: 5,
  },
})

const CommentModal = (props: any) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [title, setTitle] = useState(''),
    [review, setReview] = useState(''),
    [rating, setRating] = useState(2.5)

  const inputTitle = useCallback(
    (e) => {
      setTitle(e.target.value)
    },
    [setTitle],
  )

  const inputReviwe = useCallback(
    (e) => {
      setReview(e.target.value)
    },
    [setReview],
  )

  const modalClose = useCallback(
    (productId, contributor, rating, title, review) => {
      dispatch(addComment(productId, contributor, rating, title, review))
      dispatch(fetchProducts())
      setTitle('')
      setReview('')
      setRating(2.5)
      props.handleClose()
    },
    [rating, title, review],
  )

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      className={classes.modal}
    >
      <Fade in={props.open}>
        <div className={classes.paper}>
          <Box>
            <Typography>評価</Typography>
            <Rating
              name="review"
              size="large"
              // defaultValue={2}
              precision={0.5}
              value={rating}
              onChange={(event: any, newValue: any) => {
                setRating(newValue)
              }}
            />
          </Box>

          <TextField
            label="タイトルを入れてください"
            fullWidth={true}
            onChange={inputTitle}
          />
          <TextField
            label="本文を入れてください"
            fullWidth={true}
            multiline={true}
            rows={5}
            onChange={inputReviwe}
          />
          <div className="module-space--small" />
          <ButtonBox
            color={'primary'}
            label={'コメントを投稿'}
            onClick={() =>
              modalClose(props.id, props.userName, rating, title, review)
            }
          />
        </div>
      </Fade>
    </Modal>
  )
}

export default CommentModal
