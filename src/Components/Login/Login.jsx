import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { TextField, Button, Typography, IconButton, InputAdornment } from '@mui/material';
import axios from 'axios';
import styled from '@emotion/styled';
import { useCookies } from 'react-cookie';

const MyTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#27374d', // Focused border color
    },
  },
}));

function Login({ setCookieId }) {
    const navigate=useNavigate()
    const [cookies, setCookies] = useCookies(['asscessToken','id','username']);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Swal.fire('Error!', 'All fields are required', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire('Error!', 'Invalid email format', 'error');
            return;
        }

        if (password.length < 8) {
            Swal.fire('Error!', 'Password must be at least 8 characters long', 'error');
            return;
        }

        try {
            const response = await axios.post('http://localhost:9000/auth/login', { email, password });
            Swal.fire('Success!', 'Login successful!', 'success');
            setEmail('');
            setPassword('');
            setCookies("accessToken", response.data.token);
            setCookies("username", response.data.user.username);
            setCookies("id", response.data.user._id);
            setCookieId("cookieid",response.data.user._id); 
            navigate('/')// Pass userId to parent component
        } catch (error) {
            Swal.fire('Error!', error.message || 'Something went wrong!', 'error');
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    return (
        <div id='login-body'>
            <div className='login'>
                <Typography variant="h4" id="login-txt" gutterBottom>
                    Login
                </Typography>
                <div className='underline'></div>
                <div className='field'>
                <MyTextField
                    id="login-email"
                    autoComplete='off'
                    label="Email"
                    variant="outlined"
                    InputProps={{startAdornment:(<MailOutlineIcon style={{ marginRight: "8px" }}/>)}}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <MyTextField
                    id="login-password"
                    autoComplete='off'
                    label="Password"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        startAdornment:(<VpnKeyIcon style={{ marginRight: "8px" }}/>),
                        endAdornment: (
                            <InputAdornment position="end" className='eye'>
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
                </div>
                
                <Button id='login-button' variant="contained" color="primary" onClick={handleLogin}>
                    Login
                </Button>

                <Typography variant="body2" style={{ marginTop: '10px' }}>
                    <Link id="forget-link" to='/forget' style={{ cursor: 'pointer', color: '#1976D2' ,textDecoration:'none'}}>
                        Forgot Password?
                    </Link>
                </Typography>

                <Typography id="signup" variant="body2" style={{ marginTop: '10px', color: 'black' }}>
                    Don't have an account?
                    <Link id="siup" to='/signup' style={{ textDecoration: 'none', color: '#1976D2' }}>
                        Sign Up
                    </Link>
                </Typography>
            </div>
        </div>
    );
}

export default Login;
