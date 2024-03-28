import React from 'react';
import { useData } from '../../DataContext';
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";


function ViewCart() {
  const { cart } = useData();
  

  return (
    <div>
      <h2>Shopping Cart</h2>
      <Grid container spacing={2}>
        {cart.map(item => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ViewCart;
