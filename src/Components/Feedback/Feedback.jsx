import './Feedback.css'
import { Button, TextField, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import * as React from 'react'
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
  
function Feedback(){
    const [value, setValue] = React.useState(0);

    return(
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
            InputProps={{ startAdornment: (<PersonIcon style={{ marginRight: "8px" }} />) }}
            
          />
          <MyTextField
            id="outlined-basic"
            label="E-Mail"
            variant="outlined"
            InputProps={{ startAdornment: (<MailOutlineIcon style={{ marginRight: "8px" }} />) }}
          />
          <MyTextField
            id="outlined-basic"
            label="Mobile Number"
            type='number'
            variant="outlined"
            InputProps={{ startAdornment: (<PhoneInTalkIcon style={{ marginRight: "8px" }} />) }}
          />
          <MyTextField
            id="outlined-multiline-flexible"
            InputProps={{ startAdornment: (<ChatBubbleOutlineIcon style={{ marginRight: "8px" }} />) }}
            label="Message"
            multiline
            maxRows={4}
          />
          <Typography component="legend">Ratings for Our Services</Typography>
        <Rating className='rating'
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);
            }}
        />
        </div>
        <Button variant='contained' color='primary' id="btn">Send</Button>
                </div>
            </div>
        </>
    )
}
export default Feedback