import React from 'react'
import { Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';

const PriceBox = (props) => {
    return (
        <TableContainer component={Paper} >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>サイズ</TableCell>
                        <TableCell>価格</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.prices.length > 0 && (
                        props.prices.map((price, i) => (
                            <TableRow key={i}>
                                <TableCell>{price.size}</TableCell>
                                <TableCell>￥{price.price}円</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PriceBox