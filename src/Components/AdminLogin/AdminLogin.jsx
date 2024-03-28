import { Button, TextField, Typography } from '@mui/material'
import './AdminLogin.css'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'

function AdminLogin() {

  const [user,setUser]=useState()
  const [password,setPassword]=useState()

  const submit=async()=>{
    if(!user || !password){
      Swal.fire("Error","Fill all the Fields",'error')
      return
    }
try{
  const response=await axios.post('http://localhost:9000/',{user,password})
  Swal.fire('Success!', 'Login successful!', 'success');
  setUser('');
  setPassword('');
  localStorage.getItem('admintoken',response.data.token)
  window.location.href = '/dashboard';
}
catch(err){
  Swal.fire('')
}

  }
  return (
    <div className='admin-body'>
      <div className='admin'>
        <Typography variant='h4' gutterBottom>Admin Login</Typography>

        <TextField
        id=''
        autoComplete='off'
        label='UserName'
        variant='outlined'
        onChange={(e)=>setUser(e.target.value)}/>

        <TextField
        id=''
        autoComplete='off'
        label='Password'
        type='password'
        variant='outlined'
        onChange={(e)=>setPassword(e.target.value)}/>

        <Button variant='contained' onClick={submit}>Login</Button>
      </div>
    </div>
  )
}

export default AdminLogin
