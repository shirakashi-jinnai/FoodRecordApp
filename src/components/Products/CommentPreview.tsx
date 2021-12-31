import { ListItemText } from '@material-ui/core'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import Divider from '@material-ui/core/Divider'
import { Rating } from '@material-ui/lab'

const useStyles = makeStyles({
  commentBox: {
    height: 100,
  },
  inline: {
    display: 'block',
  },
})

const CommentPreview = (props: { comment: Comment }) => {
  const classes = useStyles()
  const { contributor, rating, title, review } = props.comment
  return (
    <ListItemText
      className={classes.commentBox}
      primary={contributor}
      secondary={
        <>
          <Typography
            component="span"
            variant="body2"
            className={classes.inline}
            color="textPrimary"
          >
            <Rating name="read-only" size="small" value={rating} readOnly />
            {title}
          </Typography>
          ー{review}
          <Divider />
        </>
      }
    />
  )
}

export default CommentPreview
