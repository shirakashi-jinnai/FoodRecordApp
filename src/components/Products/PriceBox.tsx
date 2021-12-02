import React from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'

const PriceBox = (props: any) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>サイズ</TableCell>
            <TableCell>価格</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.prices.length > 0 &&
            props.prices.map((price: any, i: any) => (
              <TableRow key={i}>
                <TableCell>{price.size}</TableCell>
                <TableCell>￥{price.price}円</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PriceBox
