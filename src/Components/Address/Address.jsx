import "./Address.css"
import Navbar2 from "../Navbar2/Navbar2"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import styled from '@emotion/styled';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import { TextField, Button, Typography, IconButton, InputAdornment } from '@mui/material';
import PinOutlinedIcon from '@mui/icons-material/PinOutlined';
import SensorDoorOutlinedIcon from '@mui/icons-material/SensorDoorOutlined';
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
const MyTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#27374d', // Focused border color
      },
    },
  }));
function Address(){
    return(
        <>
            <Navbar2 value="Delivery Address"/>
            <div className="addressBody">
                <div className="address">
                    <b><Typography variant="h6">Enter your Delivery Address</Typography></b>
                    <MyTextField
                    id="name"
                    autoComplete='off'
                    label="Full Name"
                    variant="outlined"
                    InputProps={{startAdornment:(<BadgeOutlinedIcon style={{ marginRight: "8px" }}/>)}}
                />
                <MyTextField
                    id="mobile_number"
                    autoComplete='off'
                    label="Mobile Number"
                    variant="outlined"
                    InputProps={{startAdornment:(<CallOutlinedIcon style={{ marginRight: "8px" }}/>)}}
                />
                <MyTextField
                    id="pin"
                    autoComplete='off'
                    label="PIN Code"
                    variant="outlined"
                    InputProps={{startAdornment:(<PinOutlinedIcon style={{ marginRight: "8px" }}/>)}}
                />
                <MyTextField
                    id="door"
                    autoComplete='off'
                    label="Door No"
                    variant="outlined"
                    InputProps={{startAdornment:(<SensorDoorOutlinedIcon style={{ marginRight: "8px" }}/>)}}
                />
                <MyTextField
                    id="area"
                    autoComplete='off'
                    label="Area, Street, Sector, Village"
                    variant="outlined"
                    InputProps={{startAdornment:(<SignpostOutlinedIcon style={{ marginRight: "8px" }}/>)}}
                />
                <MyTextField
                    id="landmark"
                    autoComplete='off'
                    label="Landmark"
                    variant="outlined"
                    InputProps={{startAdornment:(<LocationOnOutlinedIcon style={{ marginRight: "8px" }}/>)}}
                />
                <MyTextField
                    id="town"
                    autoComplete='off'
                    label="Town / City"
                    variant="outlined"
                    InputProps={{startAdornment:(<LocationCityOutlinedIcon style={{ marginRight: "8px" }}/>)}}
                />
                <Button id='next' variant="contained" color="primary" >
                    Next
                </Button>
                </div>
                
            </div>
        </>
    )
}
export default Address