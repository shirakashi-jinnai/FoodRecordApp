import { Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { push } from 'connected-react-router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { db } from '../../firebase'

const useStyles = makeStyles(theme => ({
    listItem: {
        [theme.breakpoints.down('sm')]:{
            display:'flex',
            flexDirection:'column'
        }
    },
    listImg: {
        width: 150,
        height: 100,
        objectFit: 'cover'
    }
}))

const FavoriteListItem = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { name, description, images, id } = props.item
    const listId = props.listId
    const image = images ? images[0].path : 'no image';

    return (
        <>
            <ListItem className={classes.listItem} >
                <ListItemAvatar onClick={() => dispatch(push(`/product/detail/${id}`))}>
                    <img src={image} alt="商品画像" className={classes.listImg} />
                </ListItemAvatar>
                <ListItemText primary={name} secondary={description} />
                <IconButton onClick={() => props.delete(props.item, listId)}>
                    <Delete />
                </IconButton>
            </ListItem>
            <Divider />
        </>
    )
}

export default FavoriteListItem