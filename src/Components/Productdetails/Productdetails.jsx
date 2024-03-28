import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const PaymentButton = () => {
  const [paymentInProgress, setPaymentInProgress] = useState(false);

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
    <button onClick={handlePayment} disabled={paymentInProgress}>
      {paymentInProgress ? 'Processing Payment...' : 'Click to Pay'}
    </button>
  );
};

export default PaymentButton;
