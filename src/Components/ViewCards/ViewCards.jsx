import React from 'react';
import { useCart } from '../../DataContext';
import { Card, CardContent, CardMedia, Typography, Grid, Button } from "@mui/material";
import Navbar from '../Navbar/Navbar';

function ViewCart() {
  const { cartItems, updateCartItemQuantity } = useCart();

  const handleIncrement = (itemId) => {
    updateCartItemQuantity(itemId + 1); // Increase quantity by 1
  };

  const handleDecrement = (itemId) => {
    updateCartItemQuantity(itemId - 1); // Decrease quantity by 1
  };

  return (
    <div>
      <Navbar/>
      <h2>Shopping Cart</h2>
      <Grid container spacing={2}>
        {cartItems.map(item => (
          <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={item.Image}
                alt={item.productName
                  }
              />
              <CardContent>
                <Typography variant='h5'>{item.productName}</Typography>
                <Typography>Model: {item.description}</Typography>
                <Typography>Price: ₹ {item.productPrice}</Typography>
                <Typography>Quantity: {item.quantity}</Typography> {/* Display quantity */}
                <Button onClick={() => handleIncrement(item._id)}>+</Button> {/* Increment button */}
                <Button onClick={() => handleDecrement(item._id)}>-</Button> {/* Decrement button */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ViewCart;
