import React from 'react'
import { Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    storeBox: {
        maxWidth:800,
        width:"100%",
        marginTop:30
    }
})

const StoresBox = (props) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper} className={classes.storeBox} >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>場所</TableCell>
                        <TableCell>開店時間</TableCell>
                        <TableCell>閉店時間</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.stores.length > 0 && (
                        props.stores.map((store) => (
                            <TableRow>
                                <TableCell>{store.place}</TableCell>
                                <TableCell>{store.startTime}時</TableCell>
                                <TableCell>{store.endTime}時</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default StoresBox