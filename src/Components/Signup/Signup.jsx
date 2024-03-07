import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import './Signup.css';
import axios from 'axios';
import styled from '@emotion/styled';
const MyTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#27374d', // Focused border color
    },
  },
}));
function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    const handleSignUp = async () => {
      if (!username || !email || !password || !confirmPassword) {
        Swal.fire('Error!', 'All fields are required', 'error');
        return;
      }
    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Swal.fire('Error!', 'Please enter a valid email address', 'error');
        return;
      }
    
      if (password !== confirmPassword) {
        Swal.fire('Error!', 'Passwords do not match', 'error');
        return;
      }
      if (password.length < 8) {
        Swal.fire('Error!', 'Password must be at least 8 characters long', 'error');
        return;
      }
    
      try {
        const response = await axios.post('http://localhost:9000/auth/signup',{username,email,password,confirmPassword})
         
    
         // Parsing response body
    
         if (!response.status === 200) {
          throw new Error(response.data.message);
        }
    
        Swal.fire('Success!', 'Signup successful!', 'success');
        setUsername('')
        setEmail('')
        setPassword('')
        setShowConfirmPassword('')
        
        // window.location.href = '/login';
      } catch (error) {
        Swal.fire('Error!', error.message || 'Something went wrong!', 'error');
      }
    };
    
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    const handleClickShowConfirmPassword = () => {
      setShowConfirmPassword(!showConfirmPassword);
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    return (
      <div className='login-body'>
        <div id="login-container">
          <Typography variant="h4" id="signup-head" gutterBottom>
            Sign Up
          </Typography>
          
          <div className='underline'></div>
          <div className="field">
          <MyTextField
            id="login-user"
            autoComplete="off"
            label="Username"
            variant="outlined"
            InputProps={{startAdornment:(<PersonIcon style={{ marginRight: "8px" }}/>)}}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
  
          <MyTextField
            id="login-email"
            autoComplete="off"
            label="Email"
            InputProps={{startAdornment:(<MailOutlineIcon style={{ marginRight: "8px" }}/>)}}

            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
  
          <MyTextField
            id="login-password"
            label="Password"
            variant="outlined"
            
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment:(<VpnKeyIcon style={{ marginRight: "8px" }}/>),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
  
          <MyTextField
            id="login-confirm-pass"
            label="Confirm Password"
            variant="outlined"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              startAdornment:(<VpnKeyIcon style={{ marginRight: "8px" }}/>),
              endAdornment: (
                <InputAdornment position="end">
                              

                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          </div>
          
  
          <Button variant="contained" color="primary" onClick={handleSignUp}  style={{ marginTop: '20px' }}>
            Sign Up
          </Button>
  
          <Typography variant="body2" style={{ marginTop: '20px' }}>
            Already have an account?{' '}
            <Link to="/" style={{ textDecoration: 'none', color: '#1976D2' }}>
              Login
            </Link>
          </Typography>
        </div>
      </div>
    );
}

export default Signup
