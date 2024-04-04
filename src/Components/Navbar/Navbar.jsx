import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Menu, MenuItem } from '@mui/material';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { StyledButton } from './StyledComponent';

const Navbar = () => {
  const [cookies, , removeCookie] = useCookies();
  const [isLoggedIn, setIsLoggedIn] = useState(!!cookies.accessToken);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate=useNavigate()

  const handleLogout = () => {
    Object.keys(cookies).forEach(cookieName=>{
      removeCookie(cookieName)
    })
    setIsLoggedIn(false);
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='nav-body'>
      <AppBar>
        <Toolbar>
          <div className='nav-bar'>
            <Typography variant='h6' gutterBottom id='title' style={{ fontSize: '25px', fontWeight: '700', marginTop: '10px' }}>
              R&R POWER TOOLS
            </Typography>
          </div>
          <div className='nav-link'>
            <Link to='/'>Home</Link>
            <Link to='/contact'>Contact us</Link>
            <Link to='/feedback'>Feedback</Link>
            {isLoggedIn && <Link to='/viewcard'>Cart</Link>}
            <Link to='/order'>Orders</Link>
          </div>
          <div>
            {isLoggedIn ? (
              <>
                <StyledButton className='nav-buttton' aria-controls='menu' aria-haspopup='true' onClick={handleMenu}>
                  {cookies.username}
                </StyledButton>
                <Menu id='menu' anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <StyledButton LinkComponent={Link} to='/login'>
                Sign in
              </StyledButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
