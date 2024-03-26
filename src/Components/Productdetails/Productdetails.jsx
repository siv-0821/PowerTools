import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import './Productdetails.css';
import { useData } from '../../DataContext';

const Productdetails = () => {
  const { id } = useParams();
  const { add, remove } = useData();
  const [product, setProduct] = useState([]);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/product/${id}`); // Replace YOUR_BACKEND_URL with your actual backend URL
        setProduct(response.data.id);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();

    // Cleanup function
    return () => {
      // Cleanup code if necessary
    };
  }, [id]);

  if (!product) {
    return <div>Loading...</div>; // Render loading indicator while fetching data
  }

  return (
    <div className="over-body">
      <div className="over-head">
        <Box width="300px">
          <Card key={product.id}>
            <CardMedia
              component="img"
              height="140"
              image={product.Image}
              alt="overview"
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>{product.productName}</Typography>
              <Typography variant="body2" gutterBottom component="div">{product.description}</Typography>
            </CardContent>
            <CardActions>
              <Button variant='contained' color='primary'>Buy Now</Button>
              <Button variant='contained' color='primary' onClick={() => add(product)}>Add to Cart</Button>
              <Button variant='contained' color='secondary' onClick={() => remove(product.id)}>Remove from Cart</Button>
            </CardActions>
          </Card>
        </Box>
      </div>
    </div>
  );
};
export default Productdetails;
