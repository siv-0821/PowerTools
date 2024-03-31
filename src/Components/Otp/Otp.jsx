import React, { useState, useEffect } from 'react';
import './Otp.css';
import Swal from 'sweetalert2';
import { Typography, Button } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import axios from 'axios';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
const MyTextField = styled(MuiOtpInput)(({ theme }) => ({
  '& .MuiInputBase-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#27374d', // Focused border color
    },
  },
}));
function Otp() {
  const navigate=useNavigate()
    const [otp, setOtp] = useState('');
    const [resendTime, setResendTime] = useState(60); 
  
    const handleChange = (newValue) => {
      // Check if newValue is numeric before updating the state
      if (!isNaN(newValue) && Number.isInteger(Number(newValue))) {
        setOtp(newValue);
      }
    };
  
    const handleVerify =async()=>{
      
      try {
        const response = await axios.post('http://localhost:9000/otp/reset-otp',{otp})    
          setOtp('');
          Swal.fire({title:"success",text:response.data.message,icon:"success",timer:2000})
          localStorage.setItem("resetToken",response.data.resetToken)
          navigate('/resetpass') // Assuming '/otp' is the route to enter OTP
      } catch (error) {
        
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
    }
  
    const handleResend = () => {
      // You can place logic here to resend the OTP via email or any other method
      // For now, let's just reset the timer
      setResendTime(60);
    };
  
  
    useEffect(() => {
      const timer =
        resendTime > 0 &&
        setInterval(() => setResendTime((prevTime) => prevTime - 1), 1000);
  
      // If resendTime reaches 0, clear the interval
      if (resendTime === 0) {
        clearInterval(timer);
      }
  
      return () => clearInterval(timer);
    }, [resendTime]);
  
    return (
      <div id='otp-body'>
        <div id='otp'>
         <Typography variant='h4'>Verify OTP</Typography>
          <Typography variant='h5'>
            OTP was sent to your Mail
          </Typography>
          <div className="field">
          <MyTextField
            id='otp-input'
            value={otp}
            length={6}
            numInputs={4}
            onChange={handleChange}
          />
          </div>
          
  
          <Button
            variant='contained'
            color='primary'
            id="btn"
            onClick={handleVerify} // Call handleVerify on Verify button click
          >
            Verify
          </Button>
  
          {resendTime === 0 && (
            <Button
              variant='outlined'
              color='primary'
              id="resend"
              onClick={handleResend}
            >
              Resend OTP
            </Button>
          )}
  
          {resendTime !== 0 && (
            <Typography variant='body2'>
              Resend OTP in {resendTime} seconds
            </Typography>
          )}
        </div>
      </div>
    );
}

export default Otp
