import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../DataContext';
import './Productdetails.css'
import { Cookies } from 'react-cookie';
const PaymentButton = () => {
  const cookie = new Cookies()
  const { id } = useParams();
  const { addToCart } = useCart();
  const [row, setRow] = useState([]);
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const accessToken =cookie.get("accessToken")
  const navigate = useNavigate()

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
    if(accessToken){
    addToCart(row); // Add the current item to the cart
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      text: 'Item added Successfully on your Cart!'
    });
  }else{
    navigate('/login')
  }};

  const handlePayment = async () => {
    if(accessToken){
      navigate('/address')
    /* try {
      setPaymentInProgress(true);
      const response = await axios.post('http://localhost:9000/payment/payment', {
        productName: row.productName,
        amount: row.productPrice
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
      navigate('/receipt')
    } catch (error) {
      console.error('Error initiating payment:', error);
      Swal.fire({
        icon: 'error',
        title: 'Payment Error',
        text: 'An error occurred while processing payment. Please try again later.'
      });

    } 
  finally {
      setPaymentInProgress(false);
    } */
  }
  else{
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
              image={row.Image}
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
              <Button color='primary' variant='contained' onClick={handlePayment} disabled={paymentInProgress}>
                {paymentInProgress ? 'Processing Payment...' : 'Click to Pay'}
              </Button>
            </CardActions>
          </Card>
      </div>
    </>

  );
};

export default PaymentButton;
