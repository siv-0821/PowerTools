import './Order.css'
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Button, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';
import SubjectIcon from '@mui/icons-material/Subject';
const MyTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#27374d',
        },
    },
}));


function Order() {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:9000/order/order', {
                to,
                subject,
                message,
            });
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: response.data.message,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error sending email: ' + error.message,
            });
        }
    };

    return (
        <div className="orderBody">
            <div className="mail">
                <div className="field">
                    <Typography variant='h6'>Order Products via Dealer's Mail</Typography>
                    <MyTextField
                        id="to"
                        label="To"
                        variant="outlined"
                        InputProps={{ startAdornment: (<MailOutlineIcon style={{ marginRight: "8px" }} />) }}
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    />
                    <MyTextField
                        id="subject"
                        label="Subject"
                        variant="outlined"
                        InputProps={{ startAdornment: (<SubjectIcon style={{ marginRight: "8px" }} />) }}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <MyTextField
                        id="message"
                        label="Message"
                        variant="outlined"
                        InputProps={{ startAdornment: (<ChatBubbleOutlineIcon style={{ marginRight: "8px", height: "100px" }} />) }}
                        multiline
                        maxRows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <Button id='send' variant="contained" color="primary" onClick={handleSubmit}>
                    Send
                </Button>
            </div>
        </div>
    );
}

export default Order;
