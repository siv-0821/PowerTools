import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../DataContext';
import './Productdetails.css';
import { Cookies } from 'react-cookie';

const PaymentButton = ({ cookieId }) => {
  const cookie = new Cookies();
  const { id } = useParams();
  const { addToCart, cartItems } = useCart();
  const [row, setRow] = useState({});
  const [isInCart, setIsInCart] = useState(false); // State to track whether the product is in cart
  const accessToken = cookie.get("accessToken", 'userid');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/product/${id}`);
        setRow(response.data);
        // Check if the product is already in the cart
        const isInCart = cartItems.some(item => item.productId === response.data._id);
        setIsInCart(isInCart);
      } catch (err) {
        Swal.fire('error', ` fetching data:${id}`, "error");
      }
    };
    fetchData();
  }, [id, cartItems]); // Update when cartItems changes

  const addCard = async () => {
    if (accessToken) {
      try {
        const response = await axios.post(`http://localhost:9000/cart/${cookieId}`, {
          userId: cookie.cookies.id,
          productId: row._id,
          fileName: row.fileName,
          productName: row.productName,
          productModel: row.productModel,
          productRate: row.productPrice,
          quantity: 1
        });

        if (response.status === 201) {
          addToCart(row);
          setIsInCart(true); // Update isInCart state
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
    <div className="productdetailbody">
      <Card key={row._id} className='productcard'>
        <CardMedia
          component="img"
          height="300"
          width="300"
          image={`http://localhost:9000/uploads/${row.fileName}`}
          alt={row.productName}
        />
        <CardContent >
          <Typography variant='h5'>{row.productName}</Typography>
          <Typography><b>Model :</b> {row.productModel}</Typography>
          <Typography>{row.description}</Typography>
          <Typography><b>Amount :</b> ₹ {row.productPrice}</Typography>
        </CardContent>
        <CardActions>
          {isInCart ? (
            <Button disabled variant='contained'>Already in Cart</Button>
          ) : (
            <Button onClick={addCard} variant='contained'>Add to Cart</Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default PaymentButton;
