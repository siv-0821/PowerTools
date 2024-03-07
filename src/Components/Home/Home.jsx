import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../../DataContext';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { Card, CardContent, Typography } from '@mui/material';

function Home() {
  const {setShowNavbar } = useContext(DataContext);
    setShowNavbar(true)
    const [productData,setProductData] = useState([]);
    useEffect(()=>{
      axios.get("https://65e716bf53d564627a8de1b2.mockapi.io/pt/product")
      .then((response)=>{
        console.log(response.data);
        setProductData(response.data)
      })
    },[])

    
  return (
    <div>
     <Navbar/>
     <div className='home-page'>
      {productData.map((product)=>{
        return(
          <div className='product-card'>
              <Card>
                <CardContent>
                  <Typography variant='h5'>Hi</Typography>
                </CardContent>
              </Card>
          </div>
        )
      })}
     </div>
    </div>
  )
}
export default Home