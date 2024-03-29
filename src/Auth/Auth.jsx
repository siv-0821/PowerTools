import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import axios from 'axios'

const AuthCheck = () => {
    const [noAuth,setNoAuth] = useState(true)
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        const checkAuth = async()=>{
            const token = localStorage.getItem("usertoken");
            if(!token) return setLoading(false)
            try{
            const response = await axios.post(
                "http://localhost:9000/auth/",{},
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              localStorage.setItem("userauth", response.data);
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

export default AuthCheck