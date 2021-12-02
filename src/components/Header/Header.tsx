import {
  AppBar,
  Avatar,
  IconButton,
  InputBase,
  TextField,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { AccountCircle, Favorite, Menu, Search } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { push } from 'connected-react-router'
import React, { Profiler, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchProduct } from '../../products/operating'
import { getIssigndin, getUserAvatar } from '../../users/selectors'
import HeaderDrawer from './HeaderDrawer'

const useStyles = makeStyles((theme: Theme) => ({
  grow: {
    flexGrow: 1,
  },
  toolBar: {
    maxWidth: 1200,
    width: '100%',
    margin: '0 auto',
  },
  title: {
    fontSize: 25,
    '&:hover': {
      cursor: 'pointer',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  search: {
    display: 'flex',
    marginLeft: 10,
  },
}))

const Header = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const selector = useSelector((state) => state)
  const isSigndin = getIssigndin(selector)
  const avatar = getUserAvatar(selector)
  const [open, setOpen] = useState(false),
    [keyword, setKeyword] = useState('')

  const tggleDrawer = useCallback((e, open) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return
    }
    setOpen(open)
  }, [])

  const inputKeyword = useCallback(
    (e) => {
      setKeyword(e.target.value)
    },
    [setKeyword],
  )

  useEffect(() => {
    dispatch(searchProduct(keyword))
  }, [keyword])

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" color="primary">
        <Toolbar className={classes.toolBar}>
          <IconButton onClick={(e) => tggleDrawer(e, true)}>
            <Menu />
          </IconButton>
          <HeaderDrawer tggleDrawer={tggleDrawer} open={open} />

          <Typography
            onClick={() => dispatch(push('/'))}
            className={classes.title}
          >
            食べ物図鑑
          </Typography>
          <div className={classes.search}>
            <Search />
            <TextField
              variant="standard"
              placeholder="検索"
              onChange={inputKeyword}
            />
            {/* <input type="submit" method='get' /> */}
            {/* <IconButton >
                        </IconButton> */}
          </div>
          {/* <form action="search">
                        <input type="text" placeholder='keyword' name='search-key'   />
                        <input type="submit" method='get' /> 
                    </form> */}
          <div className={classes.grow}></div>
          {isSigndin && (
            <>
              <IconButton onClick={() => dispatch(push('/favorite'))}>
                <Favorite />
              </IconButton>

              <IconButton onClick={() => dispatch(push('/profileedit'))}>
                <Avatar src={avatar} alt="アバター画像" />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
