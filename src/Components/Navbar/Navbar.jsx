import { AppBar, Toolbar } from '@mui/material'
import React from 'react'

const Navbar=(props)=> {

  return (
    <div>
      <AppBar >
        <Toolbar>
        {props.value}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
