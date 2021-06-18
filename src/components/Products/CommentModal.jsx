import { Box, Fade, fade, Modal, TextField, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import React, { useCallback, useState } from 'react'


const useStyles = makeStyles({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paper: {
        background: '#fff',
        width: 500,
        height: 500,
        borderRadius: 5
    }
})

const CommentModal = (props) => {
    const classes = useStyles();
    const [title, setTitle] = useState(''),
        [review, setReview] = useState(''),
        [rating, setRating] = useState('')

    const inputTitle = useCallback((e) => {
        setTitle(e.target.value)
    }, [setTitle])

    const inputReviwe = useCallback((e) => {
        setReview(e.target.value)
    }, [setReview])

    const inputRating = useCallback(() => {

    }, [])

    return (
        <Modal
            open={props.open} onClose={props.handleClose} closeAfterTransition
            className={classes.modal}
        >
            <Fade in={props.open}>
                <div className={classes.paper}>
                    <Box>
                        <Typography>評価</Typography>
                        <Rating/>
                        {/* <Rating
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue)
                            }}
                        /> */}
                    </Box>
                    <div className='module-space--medium' />
                    <TextField label='タイトルを入れてください' fullWidth={true} />
                    <TextField label='本文を入れてください' fullWidth={true} multiline={true} rows={5} />
                </div>
            </Fade>
        </Modal>
    )
}

export default CommentModal