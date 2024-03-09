import { Button, TextField, Typography } from '@mui/material'
import './ResetPass.css'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import styled from '@emotion/styled';
const MyTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#27374d', // Focused border color
    },
  },
}));
function ResetPass() {
    const [password, setPassword] = useState()
    const [resetpassword, setResetpassword] = useState()
    const reset = async () => {
  
      if (!password || !resetpassword) {
        Swal.fire('Error', 'Please enter all the fields', 'error')
        return
      }
  
      if(password.length < 8){
        Swal.fire('Error','Password must in 8 Characters','error')
        return
      }
  
      if(password !== resetpassword){
        Swal.fire('Error','Password does not match','error')
        return
      }
      try{
        const token=localStorage.getItem("resetToken")
        const request =await axios.post('http://localhost:9000/otp/new-password',{password},{
          headers: {
            'Authorization': `Bearer ${token}`
          }})
        Swal.fire({title:"success",text:request.data,icon:"success",timer:2000})
        
        window.location.href='/'
        
      }
      catch(error) {
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
    return (
      <div id='reset-body'>
        <div id='reset'>
          <Typography variant='h5'>Reset your Password</Typography>
          <div className="underline"></div>
          <div className="field">
          <MyTextField
            id=''
            label='New Password'
            variant='outlined'
            InputProps={{startAdornment:(<VpnKeyIcon style={{ marginRight: "8px" }}/>)}}

            value={password}
            onChange={(e) => setPassword(e.target.value)} />
  
          <MyTextField
            id=''
            label='Confirm Password'
            variant='outlined'
            type='password'
            InputProps={{startAdornment:(<VpnKeyIcon style={{ marginRight: "8px" }}/>)}}

            value={resetpassword}
            onChange={(e) => setResetpassword(e.target.value)}
          />
          </div>
          <Button variant='contained' onClick={reset} color='primary' id="btn">Change</Button>
        </div>
      </div>
    )
}

export default ResetPass
