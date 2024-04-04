// Frontend ViewCart component
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Button, CardActions } from "@mui/material";
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function ViewCart({ cookieId }) {

  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/cart/${cookieId}`);
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    if (cookieId) {
      fetchCartItems()
    }
    else {
      Swal.fire('Not Login')
    }
  }, [])
  // useEffect to fetch cart items when userId changes

  const handleIncrement = async (id) => {
    try {
      const increment = await axios.put(`http://localhost:9000/cart/increment/${cookieId}/${id}`);
      // Update quantity in state
      setCartItems([increment.data]);
      console.log('increment success');
    } catch (error) {
      console.error('Error incrementing quantity:', error);
    }
  };

  const handleDecrement = async (id) => {
    try {
      const decrement = await axios.put(`http://localhost:9000/cart/decrement/${cookieId}/${id}`);
      setCartItems([decrement.data]);
      console.log('decrement success');
    }
    catch (error) {
      console.error('Error decrementing quantity:', error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/cart/${cookieId}/${id}`);
      // Remove item from state
      setCartItems(prevCartItems => prevCartItems.filter(item => item._id !== id));
      console.log('succcess');
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Shopping Cart</h2>
      <Grid container spacing={2}>
        {cartItems.map(item => (
          <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
            <Card key={item._id}>
              <CardMedia
                component="img"
                height="200"
                image={item.fileName} // Corrected from 'item.Image'
                alt={item.productName}
              />
              <CardContent>
                <Typography variant='h5'>{item.productName}</Typography>
                <Typography>Model: {item.productModel}</Typography>
                <Typography>Price: ₹ {item.productRate}</Typography>
                <Typography>Quantity: {item.quantity}</Typography>
                <Typography>Quantity: {item.totalPrice}</Typography>
                <Button onClick={() => handleIncrement(item._id)}>+</Button>
                <Button onClick={() => handleDecrement(item._id)}>-</Button>
                <Button onClick={() => handleRemove(item._id)}>Remove</Button>
              </CardContent>
              <CardActions>
                <Button
                  color='primary'
                  variant='contained'
                  component={Link}
                  to="/address"
                  state={{ productName: item.productName, productPrice: item.totalPrice }}
                >
                  Buy Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ViewCart;
