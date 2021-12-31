import { Checkbox, FormControlLabel, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
  checkbox: {
    width: '85%',
  },
})

const CheckBox = (props: CheckBox) => {
  const classes = useStyles()

  return (
    <FormControlLabel
      className={classes.checkbox}
      control={
        <Checkbox
          checked={props.checked}
          onChange={props.handlechange}
          color={props.color}
        />
      }
      label={props.label}
    />
  )
}

export default CheckBox
