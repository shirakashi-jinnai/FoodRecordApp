import { ListItem, ListItemText } from '@material-ui/core'
import { List } from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { getProductList } from '../../products/selectors'

const CommentPreview = (props) => {
    // const selector = useSelector(state => state)
    // const products = getProductList(selector)
    // console.log(props.product)
    const { contributor, rating, title, preview } = props.comment
    return (
        <List>
            <ListItemText
                primary={title}
            />
        </List>
    )
}

export default CommentPreview