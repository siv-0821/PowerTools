import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useCart } from '../../DataContext';

const PaymentButton = () => {
   const { id } = useParams(); 
  const { addToCart } = useCart();
  const [row, setRow] = useState([]);
  const [paymentInProgress, setPaymentInProgress] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/product/${id}`);
        console.log(response.data);
        setRow(response.data);
      } catch (error) {
        console.error(`Error fetching data:${id}`, error);
      }
    };
    fetchData();
  }, [id]);

  const addcard = () => {
    addToCart(row); // Add the current item to the cart
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      text: 'Item has been added to your cart!'
    });
  };

  const handlePayment = async () => {
    try {
      setPaymentInProgress(true);
      const response = await axios.post('http://localhost:9000/payment/payment', {
        productName: 'Angle Grinder', 
        amount: 3000 
      });

      const { data } = response;
      const options = {
        key: 'rzp_test_OuBzAEm7MsopRx',
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: data.notes.productName,
        description: `Payment for ${data.notes.productName}`,
        handler: function (response) {
          Swal.fire({
            icon: 'success',
            title: 'Payment Successful',
            text: `Payment ID: ${response.razorpay_payment_id}`
          });
        },
        prefill: {
          name: 'John Doe',
          email: 'example@example.com',
        },
        theme: {
          color: '#3399cc'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      Swal.fire({
        icon: 'error',
        title: 'Payment Error',
        text: 'An error occurred while processing payment. Please try again later.'
      });
    } finally {
      setPaymentInProgress(false);
    }
  };

  return (
    <Card key={row.id}>
      <CardMedia
        component="img"
        height="200"
        image={row.Image}
        alt={row.productName}
      />
      <CardContent>
        <Typography variant='h5'>{row.productName}</Typography>
        <Typography>Model: {row.productModel}</Typography>
        <Typography>{row.description}</Typography>
        <Typography>Price: ₹ {row.productPrice}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={addcard}>Add to Card</Button>
      <Button color='primary' variant='contained' onClick={handlePayment} disabled={paymentInProgress}>
        {paymentInProgress ? 'Processing Payment...' : 'Click to Pay'}
      </Button>
      </CardActions>
    </Card>
  );
};

export default PaymentButton;
