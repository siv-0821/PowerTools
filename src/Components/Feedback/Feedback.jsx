import './Feedback.css';
import { Button, TextField, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import * as React from 'react';
import Swal from 'sweetalert2';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import axios from 'axios';
import styled from '@emotion/styled';

const MyTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#27374d',
    },
  },
}));

function Feedback() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [value, setValue] = React.useState(0);

  const handleSend = () => {
    if (!name.trim() || !email.trim() || !mobile.trim() || !message.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address!',
      });
      return;
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile.trim())) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Mobile Number',
        text: 'Please enter a valid 10-digit mobile number!',
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Feedback Submitted',
      text: 'Thank you for your feedback!',
    });

  
    setName('');
    setEmail('');
    setMobile('');
    setMessage('');
    setValue(0);

    axios.post('/feedback/feedback', { name, email, mobile,message,value })
      .then((response) => {
         Swal.fire({
           icon: 'success',
           title: 'Submitted Successfully!',
           text: 'Thank you for your feedback!',
         });
       })
       .catch((error) => {
         Swal.fire({
           icon: 'error',
           title: 'Oops...',
           text: 'Something went wrong!',
         });
       });
  };

  return (
    <>
      <div className="body">
        <div className="feedback">
          <Typography variant="h5">Submit your Feedback about Our Services</Typography>
          <div className="underline"></div>
          <div className="field">
            <MyTextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{ startAdornment: <PersonIcon style={{ marginRight: '8px' }} /> }}
            />
            <MyTextField
              id="outlined-basic"
              label="E-Mail"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{ startAdornment: <MailOutlineIcon style={{ marginRight: '8px' }} /> }}
            />
            <MyTextField
              id="outlined-basic"
              label="Mobile Number"
              type="number"
              variant="outlined"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              InputProps={{ startAdornment: <PhoneInTalkIcon style={{ marginRight: '8px' }} /> }}
            />
            <MyTextField
              id="outlined-multiline-flexible"
              label="Message"
              multiline
              maxRows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              InputProps={{ startAdornment: <ChatBubbleOutlineIcon style={{ marginRight: '8px' }} /> }}
            />
            <Typography component="legend">Ratings for Our Services</Typography>
            <Rating
              className="rating"
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </div>
          <Button variant="contained" color="primary" id="btn" onClick={handleSend}>
            Send
          </Button>
        </div>
      </div>
    </>
  );
}

export default Feedback;
