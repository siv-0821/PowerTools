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


  const handleSend = async () => {
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
      Swal.fire('Error!', 'Invalid email format', 'error');
      return;
    }
    try {
      const response = await axios.post('http://localhost:9000/newsletter/newsletter', { name, email, message });
      if (!response.status === 200) {
        throw new Error(response.data.message);
      }
      Swal.fire('Success!', 'Submitted Successfully!', 'success');
    }
    catch (error) {
      Swal.fire('Error!', error.message || 'Something went wrong!', 'error');
    }
    setEmail('')
setName('')
setMessage('')

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
        <Typography variant='h7' align='left' className='detail'>+91 9487842495</Typography>
        <Typography variant='h6' align='left' className='head'>E-Mail :</Typography>
        <Typography variant='h7' align='left' className='detail'>rameshandramesh11@gmail.com</Typography>
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
          onChange={(e) => setName(e.target.value)}
        />
        <MyTextField
          id="outlined-basic"
          label="E-Mail"
          variant="outlined"
          InputProps={{ startAdornment: (<MailOutlineIcon style={{ marginRight: "8px" }} />) }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <MyTextField
          id="outlined-multiline-flexible"
          InputProps={{ startAdornment: (<ChatBubbleOutlineIcon style={{ marginRight: "8px" }} />) }}
          label="Message"
          multiline
          maxRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <Button variant='contained' color='primary' id="btn" onClick={handleSend}>Send</Button>
    </div>

  </div>
);
}

export default Contact;
