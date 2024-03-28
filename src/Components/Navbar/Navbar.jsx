import { AppBar, Toolbar, Typography } from '@mui/material'
import './Navbar.css'
import { Link } from 'react-router-dom'
const Navbar=()=> {

  return (
    <div className='boxes' >
      <AppBar >
        <Toolbar className='nav'>
        <div className='shop'>
        <Typography variant='h6' gutterBottom id="title">R&R POWER TOOLS</Typography>
        </div>
        <Link to='/viewcard'>View</Link>
        <Typography  variant='h5' gutterBottom id="upload-head">{}</Typography>
        
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
