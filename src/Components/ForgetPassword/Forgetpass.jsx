import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'; // Import Axios
import './Forgetpass.css';
import { Button, TextField, Typography } from '@mui/material';

function Forgetpass() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = async () => {
      if (!email) {
        Swal.fire('Error!', 'Fill the Email field', 'error');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Swal.fire('Error!', 'Invalid email format', 'error');
        return;
      }
  
      try {
        const response = await axios.post('http://localhost:9000/otp/reset-password', { email });
        
          setMessage(`Password reset link sent to ${email}`);
          setEmail('');
          Swal.fire({title:"success",text:"Email sent with code",icon:"success",timer:2000})
          window.location.href = '/otp'; // Assuming '/otp' is the route to enter OTP
      } catch (error) {
        console.log(email);
        // Swal.fire('Error!', 'Failed to submit form', 'error');
        if(error.response.status){
          Swal.fire({
            title: error.response.statusText,
            text: error.response.data,
            icon: "error",
          });
        }else{
          Swal.fire({ title: "Error", text: error.message, icon: "error" });
        }
      }
    };
  
    return (
      <div id='forget-body'>
        <div id='forget'>
          <Typography id="title" variant="h6" gutterBottom>
            Enter your email to get OTP
          </Typography>
  
          <TextField
            variant="outlined"
            required
            autoComplete="off"
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
  
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
  
          {message && (
            <Typography variant="body1" align="center">
              {message}
            </Typography>
          )}
        </div>
      </div>
    );
}

export default Forgetpass
