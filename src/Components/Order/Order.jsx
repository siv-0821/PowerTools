import './Order.css'
import Navbar from '../Navbar/Navbar'
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
    return (
        <>
            <Navbar value="Order Products" />
            <div className="orderBody">
                <div className="mail">
                    <div className="field">
                        <Typography variant='h6'>Order Products via Dealer's Mail</Typography>
                        <MyTextField
                            id="outlined-basic"
                            label="To"
                            variant="outlined"
                            InputProps={{ startAdornment: (<MailOutlineIcon style={{ marginRight: "8px" }} />) }}
                        />
                        <MyTextField
                            id="outlined-basic"
                            label="Subject"
                            variant="outlined"
                            InputProps={{ startAdornment: (<SubjectIcon style={{ marginRight: "8px" }} />) }}
                        />
                        <MyTextField
                            id="outlined-multiline-flexible"
                            InputProps={{ startAdornment: (<ChatBubbleOutlineIcon style={{ marginRight: "8px", height:"100px" }} />) }}
                            label="Message"
                            multiline
                            maxRows={4}
                        />
                    </div>
                    <Button id='send' variant="contained" color="primary">
                    Send
                </Button>
                </div>
            </div>
        </>
    )
}
export default Order