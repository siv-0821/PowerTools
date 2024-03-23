import { Button, TextField, Typography } from '@mui/material'
import './AdminLogin.css'
import { useState } from 'react'
import Swal from 'sweetalert2'

function AdminLogin() {

  const [user,setUser]=useState()
  const [password,setPassword]=useState()

  const submit=()=>{
    if(!user || !password){
      Swal.fire("Error","Fill all the Fields",'error')
      return
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
