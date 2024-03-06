import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './Signup.css';
import axios from 'axios';

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
          <Typography variant="h4" id="h" gutterBottom>
            Sign Up
          </Typography>
  
          <TextField
            id="login-user"
            autoComplete="off"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
  
          <TextField
            id="login-email"
            autoComplete="off"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
  
          <TextField
            id="login-password"
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
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
  
          <TextField
            id="login-confirm-pass"
            label="Confirm Password"
            variant="outlined"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
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
  
          <Button variant="contained" color="primary" onClick={handleSignUp}>
            Sign Up
          </Button>
  
          <Typography variant="body2" style={{ marginTop: '10px' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ textDecoration: 'none', color: '#1976D2' }}>
              Login
            </Link>
          </Typography>
        </div>
      </div>
    );
}

export default Signup
