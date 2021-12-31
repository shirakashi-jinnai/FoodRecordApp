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
import { makeStyles } from '@material-ui/styles'
import React, { useCallback, useEffect, useState } from 'react'

const useStyles = makeStyles({
  place: {
    maxWidth: 100,
    width: '100%',
  },
  time: {
    maxWidth: 140,
    width: '100%',
  },
})

const SetStoresArea = (props: { stores: Store[]; setStores: any }) => {
  const classes = useStyles()
  const [place, setPlace] = useState(''),
    [startTime, setStartTime] = useState(''),
    [endTime, setEndTime] = useState(''),
    [index, setIndex] = useState(0)

  const inputPlace = useCallback(
    (e) => {
      setPlace(e.target.value)
    },
    [place],
  )

  const inputStartTime = useCallback(
    (e) => {
      setStartTime(e.target.value)
    },
    [startTime],
  )

  const inputEndTime = useCallback(
    (e) => {
      setEndTime(e.target.value)
    },
    [endTime],
  )

  const addStores = (
    place: string,
    startTime: string,
    endTime: string,
    index: number,
  ) => {
    const newPlace = place ? place : 'no data'
    const newStartTime = startTime ? startTime : 'no data'
    const newEndTime = endTime ? endTime : 'no data'

    if (index === props.stores.length) {
      props.setStores((prevState) => [
        ...prevState,
        { place: newPlace, startTime: newStartTime, endTime: newEndTime },
      ])
    } else {
      const newStores = props.stores
      newStores[index] = {
        place: newPlace,
        startTime: newStartTime,
        endTime: newEndTime,
      }
      props.setStores(newStores)
      setIndex(props.stores.length)
    }

    setPlace('')
    setStartTime('')
    setEndTime('')
  }

  const deleteStores = (index: number) => {
    const newStores = props.stores.filter((_: any, i: number) => i !== index)
    props.setStores(newStores)
  }

  const editStores = (index: number) => {
    const stores = props.stores[index]
    setIndex(index)
    setPlace(stores.place)
    setStartTime(stores.startTime)
    setEndTime(stores.endTime)
  }

  useEffect(() => {
    setIndex(props.stores.length)
  }, [props.stores.length])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>場所</TableCell>
            <TableCell>開店時刻</TableCell>
            <TableCell>閉店時刻</TableCell>
            <TableCell>編集</TableCell>
            <TableCell>削除</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.stores.length > 0 &&
            props.stores.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.place}</TableCell>
                <TableCell>{item.startTime}</TableCell>
                <TableCell>{item.endTime}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editStores(index)}>
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteStores(index)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div>
        <TextField
          value={place}
          onChange={inputPlace}
          label="場所"
          className={classes.place}
          margin="dense"
          type="text"
          placeholder="東京都 足立区"
          size="small"
        />
        <TextField
          value={startTime}
          onChange={inputStartTime}
          label="開店時刻"
          margin="dense"
          type="time"
          className={classes.time}
        />
        <TextField
          value={endTime}
          onChange={inputEndTime}
          label="閉店時刻"
          margin="dense"
          type="time"
          className={classes.time}
        />
      </div>
      <IconButton onClick={() => addStores(place, startTime, endTime, index)}>
        <AddBox />
      </IconButton>
    </TableContainer>
  )
}

export default SetStoresArea
