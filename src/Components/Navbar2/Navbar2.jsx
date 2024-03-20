import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import './Navbar2.css'

const Navbar2=(props)=> {

  return (
    <div >
      <AppBar >
        <Toolbar className='nav'>
        <div className='shop'>
        <Typography variant='h6' gutterBottom id="title">R&R POWER TOOLS</Typography>
        </div>
        <Typography  variant='h5' gutterBottom id="upload-head">{props.value}</Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar2
