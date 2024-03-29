import './Home.css';
//import Navbar from '../Navbar/Navbar';
 import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'; 
import Navbar from '../Navbar/Navbar';

function Home() {
   const [rows, setRow] = useState([])
  useEffect(()=>{
    const fetchdata = async () => {
      const response =await axios.get("http://localhost:9000/product");
      console.log(response.data);
      setRow(response.data)
    }
    fetchdata()
  },[])

   return (
    <div className="home-body">
      <Navbar/>
       <div className='home-main'>
        <div className='home-map'>
          {rows.map(item => (
            <div key={item._id}>
              <Card sx={{width:230}}>
                <Link  to={`/productdetails/${item._id}`}>
                  <CardMedia
                    component="img"
                    height="200"
                    width='200'
                    image={item.Image}
                    alt={item.productName}
                  />
                  <CardContent>
                    <Typography variant='h5'>{item.productName}</Typography>
                    <Typography>Model : {item.productModel}</Typography>
                    <Typography>{item.description}</Typography>
                    <Typography>Amount : ₹ {item.productPrice}</Typography>
                  </CardContent>
                </Link>
                <CardActions>

                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      </div> 
    </div>
  );
}

export default Home;
