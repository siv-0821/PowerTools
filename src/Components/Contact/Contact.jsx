import { Button, TextField, Typography } from '@mui/material';
import './Contact.css';
import { useState } from 'react';
import Swal from 'sweetalert2';
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

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendClick = () => {
    if (!name || !email || !message) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!',
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid email address!',
      });
      return;
    }

     axios.post('/newsletter/newsletter', { name, email, message })
      .then((response) => {
         Swal.fire({
           icon: 'success',
           title: 'Success!',
           text: 'Message sent successfully!',
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
    <div id="contact-body">
      <div id="contact">
        <Typography variant='h5'>Contact us</Typography>
        <div className="underline"></div>
        <div className="field">
          <Typography variant='h6' align='left' className='head'>Address :</Typography>
          <Typography variant='h7' align='left' className='detail'>No. 174, T.B. Road, Thiuchendur  628-215.</Typography>
          <Typography variant='h6' align='left' className='head'>Contact Number :</Typography>
          <Typography variant='h7'  align='left' className='detail'>+91 9487842495</Typography>
          <Typography variant='h6'  align='left' className='head'>E-Mail :</Typography>
          <Typography variant='h7'  align='left' className='detail'>rameshandramesh11@gmail.com</Typography>
        </div>
      </div>
      <div id="contact">
        <Typography variant='h5'>Get in Touch with Us</Typography>
        <div className="underline"></div>
        <div className="field">
          <MyTextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            InputProps={{ startAdornment: (<PersonIcon style={{ marginRight: "8px" }} />) }}
            value={name}
            onChange={handleNameChange}
          />
          <MyTextField
            id="outlined-basic"
            label="E-Mail"
            variant="outlined"
            InputProps={{ startAdornment: (<MailOutlineIcon style={{ marginRight: "8px" }} />) }}
            value={email}
            onChange={handleEmailChange}
          />
          <MyTextField
            id="outlined-multiline-flexible"
            InputProps={{ startAdornment: (<ChatBubbleOutlineIcon style={{ marginRight: "8px" }} />) }}
            label="Message"
            multiline
            maxRows={4}
            value={message}
            onChange={handleMessageChange}
          />
        </div>
        <Button variant='contained' color='primary' id="btn" onClick={handleSendClick}>Send</Button>
      </div>
      
    </div>
  );
}

export default Contact;
