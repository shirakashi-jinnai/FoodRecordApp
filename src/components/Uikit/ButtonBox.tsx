import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

const useStyles = makeStyles({
  btnStyle: {
    width: '100%',
    maxWidth: 200,
    height: 50,
    margin: '0 auto',
  },
})

type Props = {
  color?: 'inherit' | 'default' | 'primary' | 'secondary'
  onClick: () => any
  label: string
}

const ButtonBox = (props: Props) => {
  const classes = useStyles()
  return (
    <Button
      variant="contained"
      color={props.color}
      className={classes.btnStyle}
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  )
}

export default ButtonBox
