import './AdminLogin.css';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { TextField, Button, Typography, IconButton, InputAdornment } from '@mui/material';
import styled from '@emotion/styled';

const MyTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#27374d', // Focused border color
    },
  },
}));

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const submit = async () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire("Error", "Enter a valid email address", 'error');
      return;
    }
  
    // Validate password length
    if (password.length < 8) {
      Swal.fire("Error", "Password must be at least 8 characters long", 'error');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:9000/', { email, password });
      Swal.fire('Success!', 'Login successful!', 'success');
      setEmail('');
      setPassword('');
      localStorage.getItem('admintoken', response.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      Swal.fire('Error', 'Invalid credentials', 'error');
    }
  };
  

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <div className='admin-body'>
      <div className='admin'>
        <Typography variant="h4" id="login-txt" gutterBottom>
          Administrator
        </Typography>
        <div className='underline'></div>
        <div className='field'>
          <MyTextField
            id="login-email"
            autoComplete='off'
            label="Email"
            variant="outlined"
            InputProps={{ startAdornment: (<MailOutlineIcon style={{ marginRight: "8px" }} />) }}
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
              startAdornment: (<VpnKeyIcon style={{ marginRight: "8px" }} />),
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
          <Button variant="contained" onClick={submit}>Submit</Button>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin;
