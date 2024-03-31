import React, { useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { StyledButton } from './StyledComponent';

const Navbar = () => {
  const [cookies, , removeCookie] = useCookies(['accessToken']);
  const [isLoggedIn, setIsLoggedIn] = useState(!!cookies.accessToken);

  const handleLogout = () => {
    removeCookie('accessToken');
    setIsLoggedIn(false);
  };

  return (
    <div className='nav-body'>
      <AppBar>
        <Toolbar>
          <div className='nav-bar'>
            <Typography variant='h6' gutterBottom id="title" 
              style={{fontSize:"25px",fontWeight:"700",marginTop:"10px"}}>
              R&R POWER TOOLS
            </Typography>
          </div>
          <div className='nav-link'>
            <Link to='/'>Home</Link>
            <Link to='/contact'>Contact us</Link>
            <Link to='/feedback'>Feedback</Link>
            <Link to='/viewcard'>Cart</Link>
            <Link to='/order'>Orders</Link>
            
          </div>
          <div>
            {isLoggedIn ? (
              <StyledButton className='nav-buttton'onClick={handleLogout}>Logout</StyledButton>
            ) : (
            <StyledButton LinkComponent={Link} to="/login">Sign in</StyledButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
      
    </div>
  );
};

export default Navbar;
