import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../DataContext';
import './Productdetails.css'
import { Cookies } from 'react-cookie';


const PaymentButton = ({cookieId}) => {
  const cookie = new Cookies()
  const { id } = useParams();
  const { addToCart } = useCart();
  const [row, setRow] = useState([]);
  
  const accessToken = cookie.get("accessToken",'userid')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/product/${id}`);
        setRow(response.data);
      } catch (err) {
        Swal.fire('error',` fetching data:${id}`, "error");
      }
    };
    fetchData();
  }, [id]);

  const addcard = async () => {
    if (accessToken) {
      
      try {
        // Make a POST request to the backend to add the product to the cart
        const response = await axios.post(`http://localhost:9000/cart/${cookieId}`, {
          userId:cookie.cookies.id ,
           productId:row._id,
           fileName:row.filename,
            productName:row.productName,
             productModel:row.productModel,
              productRate:row.productPrice,
               quantity:1 // You may adjust the quantity as needed
        });
        
        // Handle the response accordingly
        if (response.status === 201) {
          addToCart(row); // Add the current item to the cart in context
          Swal.fire({
            icon: 'success',
            title: 'Added to Cart',
            text: 'Item added Successfully on your Cart!'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to add item to cart. Please try again later.'
          });
        }
      } catch (error) {
        console.error('Error adding item to cart:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while adding item to cart. Please try again later.'
        });
      }
    } else {
      navigate('/login')
    }
  };

  

  return (
    <>
      <div className="productdetailbody">
        <Card key={row._id} className='productcard'>
          <CardMedia
            component="img"
            height="300"
            width="300"
            image={row.filename}
            alt={row.productName}
          />
          <CardContent >
            <Typography variant='h5' >{row.productName}</Typography>
            <Typography><b>Model :</b> {row.productModel}</Typography>
            <Typography>{row.description}</Typography>
            <Typography><b>Amount :</b> ₹ {row.productPrice}</Typography>
          </CardContent>
          <CardActions>
            <Button onClick={addcard} variant='contained' >Add to Cart</Button>
            
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default PaymentButton;
