import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import './Navbar.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='nav-body'>
      <AppBar>
        <Toolbar>
          <div className='nav-bar'>
            <Typography variant='h6' gutterBottom id="title" 
            style={{fontSize:"25px",fontWeight:"700",marginTop:"10px"}}
            >R&R POWER TOOLS</Typography>
          </div>
          <div className='nav-link'>
            <Link to='/'>Home</Link>
            <Link to='/contact'>Contact us</Link>
            <Link to='/feedback'>Feedback</Link>
            <Link to='/viewcard'>Cart</Link>
            <Link to='/order'>Orders</Link>
          </div>
          <div>
            <Link to="/login">Sign in</Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
