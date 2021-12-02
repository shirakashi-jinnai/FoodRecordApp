import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
// import {theme} from '../../asetts/theme'



const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: 16,
        minWidth: 120,
        // width:"100%"
    
    }
}));

const SelectBox = (props) => {
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl} >
            <InputLabel>{props.label}</InputLabel>
            <Select
                onChange={props.onChange}
                value={props.value}
                required={props.required}
            >
                {props.options.map((option) =>
                    <MenuItem key={option.id} value={option.id} >{option.name}</MenuItem>
                )}
            </Select>
        </FormControl>
    )

}

export default SelectBox