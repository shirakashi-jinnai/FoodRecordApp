import { List, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import { push } from 'connected-react-router';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FavoriteListItem } from '../components/Products';
import { db } from '../firebase';
import { deleteProductsToFavorite, fetchFavoriteItem, fetchFavoriteList } from '../users/operating';
import { getUserFavorites, getuserFvoriteItem, getUserId } from '../users/selectors';

const useStyles = makeStyles({
    favoriteArea: {
        display: 'flex',
    },
    main: {
        width: '70%',
    },
    side: {
        width: '30%'
    }
})

const FavoritesList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state)
    const favoriteLists = getUserFavorites(selector)
    const uid = getUserId(selector)
    const query = window.location.search;
    // const category = /^\?category=/.test(query) ? query.split('?category=')[1] : "";このやり方でもできる
    const category = window.location.search.split('?category=')[1];

    const [favoCategories, setFavoCategories] = useState([]);
    const [favoriteItems, setFavoriteItems] = useState([]);


    const deleteFavorite = useCallback((product, listId) => {
        dispatch(deleteProductsToFavorite(product, listId))
    }, [])

    useEffect(() => {
        dispatch(fetchFavoriteList(category));
    }, [favoriteLists])

    useEffect(() => {
        const favoriteRef = db.collection('users').doc(uid).collection('favorites').orderBy('timestamp', 'asc');

        favoriteRef.get().then(snapshots => {
            snapshots.forEach(snapshot => {
                const data = snapshot.data()
                setFavoCategories(prevState => [...prevState, data.name])
            })
        })
    }, [])

    return (
        <section className={'section-wrapin'}>
            <div className={classes.favoriteArea}>
                <List className={classes.side}>
                    <ListItem button onClick={() => dispatch(push('/favorite'))}>すべて</ListItem>
                    {favoCategories.map((category, i) => (
                        <ListItem button key={i} onClick={() => dispatch(push(`/favorite/?category=${category}`))} > {category}</ListItem>
                    ))}
                </List>
                <List className={classes.main}>
                    {favoriteLists.length ? favoriteLists.map(list => (//お気に入りリスト
                        list.favoriteList.map((item, i) => (//リストの中身
                            <FavoriteListItem item={item} key={i} listId={list.id} delete={deleteFavorite} />
                        ))
                    )) : (<p>お気に入りリストが見つかりません</p>)}
                    {/* {favoriteItems.length > 0 ?favoriteItems.map((item, i) => (
                        <FavoriteListItem item={item} key={i} />
                    )):(<p>お気に入りリストが見つかりません</p>)} */}
                </List>
            </div>
        </section >
    )

}

export default FavoritesList