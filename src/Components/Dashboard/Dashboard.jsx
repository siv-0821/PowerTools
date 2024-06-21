import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import {Navigate} from 'react-router-dom'
import { Cookies } from 'react-cookie';
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import axios from 'axios'

function Dashboard() {
  const cookie = new Cookies()
  const [loading,setLoading] = useState(true)
  const [auth,setAuth] = useState(false)

  useEffect(()=>{
    const validate = async()=>{
      const token = cookie.get('admintoken')
      console.log("tokenn :",token)
      if(!token) return setLoading(false)
      try {
        const response = await axios.post(
          "http://localhost:9000/admin/verify-token/",{},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAuth(true);
        setLoading(false);

      } catch (err) {
          setLoading(false);
         
      }
    }
    validate();
  },[])

  if(loading) return <div>loading...</div>
  return (
    <>
    {auth?
      <div className='dashboard'>
      <Sidebar />
      <div className="outlet">
       <Outlet /> 
      </div>
    </div> : <Navigate to="/admin"/> }
    </>
  )
}

export default Dashboard