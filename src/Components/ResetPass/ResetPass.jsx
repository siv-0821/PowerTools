import { Button, TextField, Typography } from '@mui/material'
import './ResetPass.css'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'

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
          <TextField
            id=''
            label='New Password'
            variant='outlined'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
  
          <TextField
            id=''
            label='Reset Password'
            variant='outlined'
            type='password'
            value={resetpassword}
            onChange={(e) => setResetpassword(e.target.value)}
          />
          <Button variant='contained' onClick={reset} color='primary'>Change</Button>
        </div>
      </div>
    )
}

export default ResetPass
