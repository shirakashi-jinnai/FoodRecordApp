import { Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Divider, IconButton, makeStyles, Menu, MenuItem, Modal, Typography } from '@material-ui/core'
import { Edit, ExpandMore, Favorite, MoreVert, Share } from '@material-ui/icons';
import React, { useCallback, useState } from 'react'
import clsx from 'clsx';
import { deleteProduct, shareProduct } from '../../products/operating';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { addFavoriteStock } from '../../users/operating';
import { ModalBox } from '.';

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            width: "calc(50% - 16px)",
            margin: 5
        },
        [theme.breakpoints.up('md')]: {
            width: '30%',
            margin: 10
        }

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        '&:hover': {
            cursor: "pointer"
        }
    },
    expand: {
        transform: 'rorate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }

}))

const ProductCard = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)

    const { category, description, id, images, name, prices, storeName, stores } = props.product
    const image = images[0].path;
    const url = 'https://cook-site.web.app/product/detail/' + id

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const modalOpen = useCallback(() => {
        setOpen(true)
    }, [setOpen])

    const modalClose = useCallback(() => {
        setOpen(false)
    }, [setOpen])



    return (
        <Card className={classes.root}>
            <CardHeader
                title={name}
            />
            <CardMedia
                className={classes.media}
                image={image}
                title='test'
                onClick={() => dispatch(push('/product/detail/' + id))}
            />
            <CardContent>
                <Typography component='p' color='textPrimary' >{description}</Typography>
                <div>
                    <Typography component='p' color='textPrimary' >{prices[0].size}</Typography>
                    <Typography component='p' color='textPrimary' >￥{prices[0].price}円</Typography>
                </div>
            </CardContent>
            <CardActions>
                <IconButton onClick={modalOpen} >
                    <Favorite />
                </IconButton>
                <IconButton onClick={() => dispatch(shareProduct)}>
                    <Share />
                </IconButton>
                <IconButton onClick={handleClick}>
                    <MoreVert />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => {
                        dispatch(push(`product/edit/${id}`))
                        handleClose()
                    }}

                    >編集する</MenuItem>
                    <MenuItem onClick={() => {
                        dispatch(deleteProduct(id))
                        handleClose()
                    }}
                    >削除する</MenuItem>
                </Menu>
            </CardActions>
            <ModalBox open={open} modalClose={modalClose} product={props.product} />
        </Card >
    )
}

export default ProductCard