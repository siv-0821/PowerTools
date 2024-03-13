import './Feedback.css';
import { Button, TextField, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
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
  const [ratings, setRatings] = useState(0);
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phoneNumber, setNumber] = useState()
  const [message, setMessage] = useState()

  const handlesubmit = async () => {
    if (!name || !email || !phoneNumber || !message) {
      Swal.fire('Error', 'Fill all the Required Fields', 'error')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire('Error!', 'Invalid Email Format', 'error');
      return;
    }
    if (!(phoneNumber.toString().length === 10)) {
      Swal.fire('Error', 'Enter a valid 10 Digit Mobile Number', 'error')
      return
    }
    try {
      const response = await axios.post('http://localhost:9000/feedback/feedback', { name, email, phoneNumber, message, ratings })
      Swal.fire('Feedback Sent!','Thankyou for your Feedback!', 'success')
      setName('')
      setEmail('')
      setNumber('')
      setMessage('')
      setRatings('')
    }
    catch (error) {
      if (error.response.status) {
        Swal.fire({
          title: error.response.statusText,
          text: error.response.data.error,
          icon: "error",
        });
      } else {
        Swal.fire({ title: "Error", text: error.message, icon: "error" });
      }
    }
  }
  return (
    <>
      <div className="body">
        <div className="feedback">
          <Typography variant='h5'>Submit your Feedback about Our Services</Typography>
          <div className="underline"></div>
          <div className="field">
            <MyTextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{ startAdornment: (<PersonIcon style={{ marginRight: "8px" }} />) }}
            />

            <MyTextField
              id="outlined-basic"
              label="E-Mail"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{ startAdornment: (<MailOutlineIcon style={{ marginRight: "8px" }} />) }}
            />

            <MyTextField
              id="outlined-basic"
              label="Mobile Number"
              type='number'
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setNumber(e.target.value)}
              InputProps={{ startAdornment: (<PhoneInTalkIcon style={{ marginRight: "8px" }} />) }}
            />

            <MyTextField
              id="outlined-multiline-flexible"
              InputProps={{ startAdornment: (<ChatBubbleOutlineIcon style={{ marginRight: "8px" }} />) }}
              label="Message"
              multiline
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxRows={4}
            />

            <Typography component="legend">Ratings for Our Services</Typography>
            <Rating className='rating'
              name="simple-controlled"
              value={ratings}
              onChange={(event, newValue) => {
                setRatings(newValue);
              }}
            />
          </div>
          <Button variant='contained' color='primary' onClick={handlesubmit} id="btn">Send</Button>
        </div>
      </div>
    </>
  )
}

export default Feedback;
