import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
// import {theme} from '../../asetts/theme'

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: 16,
    minWidth: 120,
    // width:"100%"
  },
}))

type SelectBox = {
  label: string
  name: string
  value: string
  onChange: (event: any) => void
  required: boolean
  options: { id: string; name: string }[]
}

const SelectBox = (props: SelectBox) => {
  const classes = useStyles()

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        onChange={props.onChange}
        value={props.value}
        required={props.required}
      >
        {props.options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectBox
