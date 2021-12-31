import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { push } from 'connected-react-router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { db } from '../../firebase'
import { signout } from '../../reducks/users/operating'

const HeaderDrawer = (props: any) => {
  const dispatch = useDispatch()

  const selectMenu = (e: any, path: any) => {
    dispatch(push(path))
    props.tggleDrawer(e, false)
  }

  const [filters, setFilters] = useState([
    { func: selectMenu, label: 'すべて', id: 'all', path: '/' },
  ])

  const menus = [
    {
      func: selectMenu,
      label: '商品登録',
      icon: <AddCircleOutlineIcon />,
      path: '/product/edit',
    },
  ]

  useEffect(() => {
    db.collection('categories')
      .orderBy('order', 'asc')
      .get()
      .then((snapshots) => {
        const list: any = []
        snapshots.forEach((snapshot) => {
          const data = snapshot.data()
          list.push({
            func: selectMenu,
            label: data.name,
            id: data.id,
            path: `/?category=${data.id}`,
          })
        })
        setFilters((prevState) => [...prevState, ...list]) //複数*複数の時はどっちもスプレッド構文
      })
  }, [])

  return (
    <>
      <Drawer
        anchor="left"
        open={props.open}
        onClose={(e) => props.tggleDrawer(e, false)}
      >
        <div onKeyDown={(e) => props.tggleDrawer(e, false)}></div>
        <List>
          {menus.map((menu, i) => (
            <ListItem onClick={(e) => menu.func(e, menu.path)} key={i} button>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItem>
          ))}
        </List>
        <Divider />

        <List>
          {filters.map((filter, i) => (
            <ListItem
              onClick={(e) => filter.func(e, filter.path)}
              key={i}
              button
            >
              <ListItemText primary={filter.label} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem onClick={() => dispatch(signout())} button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="サインアウト" />
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}

export default HeaderDrawer
