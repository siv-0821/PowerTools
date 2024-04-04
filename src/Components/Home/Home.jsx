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
      const response =await axios.get("http://localhost:9000/product/all");
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
              <Card sx={{width:230}} className="items">
                <Link to={`/productdetails/${item._id}`}>
                  <CardMedia
                    component="img"
                    height="200"
                    width='200'
                    image={item.filename}
                    alt={item.productName}
                  />
                  <CardContent>
                    <Typography style={{fontSize:"24px"}} className="productName">{item.productName}</Typography>
                    <Typography style={{fontSize:"18px"}} className='productModel'><b>Model :</b> {item.productModel}</Typography>
                    <Typography style={{fontSize:"18px"}}className="productPrice"><b>Amount :</b> ₹ {item.productPrice}</Typography>
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
