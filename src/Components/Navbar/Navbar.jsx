import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import './Navbar.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const Navbar=(props)=> {

  return (
    <div >
      <AppBar >
        <Toolbar className='nav'>
        <ArrowBackIcon id="back" />
          <Typography variant='h6' gutterBottom id="title">R&R POWER TOOLS</Typography>
        <Typography  variant='h5' gutterBottom id="upload-head">{props.value}</Typography>
        
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
