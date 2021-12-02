import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core'
import { AddBox, Delete, Edit } from '@material-ui/icons'
import React, { useCallback, useEffect, useState } from 'react'

const SetPriceArea = (props: any) => {
  const [price, setPrice] = useState(''),
    [size, setSize] = useState(''),
    [index, setIndex] = useState(0)

  const inputPrice = useCallback(
    (e) => {
      e.target.value < 0 ? setPrice(price) : setPrice(e.target.value)
    },
    [price],
  )

  const inputSize = useCallback(
    (e) => {
      setSize(e.target.value)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [size],
  )

  const addPrices = (size, price, index) => {
    if (size === '' || price === '') {
      alert('入力値が空です')
      return false
    }

    if (props.prices.length === index) {
      props.setPrices((prevState) => [
        ...prevState,
        { size: size, price: price },
      ])
      // setIndex(props.prices.length)
      // setIndex(index + 1)
    } else {
      const newPrices = props.prices
      newPrices[index] = { size: size, price: price }
      props.setPrices(newPrices)
      setIndex(props.prices.length)
    }
    setPrice('')
    setSize('')
  }

  const deletePrices = (index) => {
    const newPrices = props.prices.filter((item, i) => i !== index)
    props.setPrices(newPrices)
  }

  const editPrices = (index) => {
    setIndex(index)
    const edit = props.prices[index]
    setPrice(edit.price)
    setSize(edit.size)
  }

  useEffect(() => {
    setIndex(props.prices.length)
  }, [props.prices.length])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>サイズ</TableCell>
            <TableCell>価格</TableCell>
            <TableCell>編集</TableCell>
            <TableCell>削除</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.prices.length > 0 &&
            props.prices.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editPrices(index)}>
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => deletePrices(index)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div>
        <TextField
          value={size}
          onChange={inputSize}
          label="サイズ"
          margin="dense"
          type="text"
          placeholder="大盛り...etc"
        />
        <TextField
          value={price}
          onChange={inputPrice}
          label="価格"
          margin="dense"
          type="number"
        />
      </div>
      <IconButton onClick={() => addPrices(size, price, index)}>
        <AddBox />
      </IconButton>
    </TableContainer>
  )
}

export default SetPriceArea
