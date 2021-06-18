import { Button, Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { push } from 'connected-react-router'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CommentModal } from '.'



const CommentArea = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleOpen = useCallback(() => {
        setOpen(true)
    }, [setOpen])
    const handleClose = useCallback(() => {
        setOpen(false)
    }, [setOpen])

    return (
        <div>
            <h1>コメント一覧</h1>
            <Button variant="contained" onClick={handleOpen} >コメントを投稿する</Button>
            <CommentModal handleOpen={handleOpen} handleClose={handleClose} open={open} />
        </div>
    )
}

export default CommentArea