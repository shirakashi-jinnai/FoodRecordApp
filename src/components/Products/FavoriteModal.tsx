import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Modal,
  TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addFavoriteStock,
  addProductsToFavorite,
  fetchFavoriteList,
} from '../../users/operating'
import { getUserFavorites, getUserName } from '../../users/selectors'
import { CheckBox } from '../Uikit'

const useStyles = makeStyles({
  paper: {
    margin: 'auto',
    width: 300,
    height: 'auto',
    background: '#fff',
    border: '2px solid #000',
  },
  favoriteLists: {
    overflowY: 'scroll',
    height: 300,
  },
  addspace: {
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    width: '100%',
  },
  buttonStyle: {
    display: 'none',
  },
})

const ModalBox = (props: any) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const selector = useSelector((state) => state)
  const favorites = getUserFavorites(selector)

  const [name, setName] = useState('')
  const [inputOpen, setInputOpen] = useState(false)
  const [checkedItems, setCheckedItems] = useState({})
  const checked = Object.values(checkedItems).filter((item) => item === true)

  const handleChange = useCallback((e, id) => {
    //{id:true or false}のオブジェクトが作られる
    setCheckedItems({
      //merge アップデート
      ...checkedItems,
      [id]: e.target.checked, //真偽値
    })
  }, [])

  const ButtonStyle = !checked.length ? classes.buttonStyle : ''

  const handleClick = useCallback(() => {
    setInputOpen(true)
  }, [setInputOpen])

  const handleClose = useCallback(
    (name) => {
      dispatch(addFavoriteStock(name)) //stockの追加
      setInputOpen(false)
      setName('')
    },
    [setInputOpen],
  )

  const inputName = (e: any) => {
    setName(e.target.value)
  }

  //送信ボタンを押したタイミングで、checkedItemsオブジェクトのvalueがtrueのkeyのみを配列にしてconsoleに表示させる
  const addFavorites = (e: any) => {
    //valueがtrueの値を返す
    e.preventDefault()
    const dataArray = Object.entries(checkedItems).reduce(
      (pre: string[], [key, value]) => {
        //(1,アキュムレータ,2currentValue)
        value && pre.push(key) //checkboxでチェックされた要素のみをpreにpushする
        return pre //checkされたリストのIDが格納されている
      },
      [],
    ) //[]は初期値
    dispatch(addProductsToFavorite(props.product, dataArray))
    setCheckedItems({})
    props.modalClose()
  }

  useEffect(() => {
    dispatch(fetchFavoriteList())
  }, [inputOpen])

  return (
    <Modal open={props.open} onClose={props.modalClose}>
      <div className={classes.paper}>
        <p>お気に入りリストに追加</p>
        <Divider />
        <div className={classes.favoriteLists}>
          {favorites.length ? (
            favorites.map((item: any) => {
              return (
                <CheckBox
                  key={item.id}
                  id={item.id}
                  handlechange={(e: any) => handleChange(e, item.id)}
                  color={'default'}
                  label={item.name}
                />
              )
            })
          ) : (
            <p>お気に入りリストがありません。作成しましょう！</p>
          )}
        </div>
        <div className={classes.addspace}>
          <button onClick={handleClick}>+リストの新規作成</button>
          {inputOpen && (
            <>
              <p>リスト名</p>
              <TextField
                // className={classes.TextField}
                variant="outlined"
                margin="dense"
                value={name}
                onChange={inputName}
              />
              <Button variant="contained" onClick={() => handleClose(name)}>
                リストを追加する
              </Button>
            </>
          )}

          <Button
            variant="contained"
            onClick={(e) => addFavorites(e)}
            className={ButtonStyle}
          >
            保存する
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalBox
