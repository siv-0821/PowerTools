import React ,{ useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {Cookies} from 'react-cookie'
import axios from 'axios'

const AdminAuthCheck = () => {
    const cookie = new Cookies()
    const [noAuth,setNoAuth] = useState(true)
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        const checkAuth = async()=>{
            const token = cookie.get("admintoken");
            if(!token) return setLoading(false)
            try{
            const response = await axios.post(
                "http://localhost:9000/admin/verify-token",{},
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              setNoAuth(false);
              setLoading(false);
            }catch(err){
                setLoading(false);
            }
        }
        checkAuth();
    },[])

    if(loading) return('loading...')
  return (
    noAuth ? <Outlet/> : <Navigate to="/dashboard" />
  )
}

export default AdminAuthCheck
