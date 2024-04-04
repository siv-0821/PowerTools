import React, { useState } from 'react';
import Navbar2 from "../Navbar2/Navbar2";
import styled from '@emotion/styled';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import { TextField, Button, Typography } from '@mui/material';
import PinOutlinedIcon from '@mui/icons-material/PinOutlined';
import SensorDoorOutlinedIcon from '@mui/icons-material/SensorDoorOutlined';
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import Swal from 'sweetalert2';
import axios from 'axios';
import './Address.css';
import { useLocation, useNavigate } from 'react-router-dom';

const MyTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#27374d',
        },
    },
}));

function Address() {
    const { state } = useLocation();
    const { productName, productPrice } = state || {};
    const navigate = useNavigate();
    const [paymentInProgress, setPaymentInProgress] = useState(false);
    const [name, setName] = useState('');
    const [contactNumber, setMobileNumber] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [doorNo, setDoorNo] = useState('');
    const [area, setArea] = useState('');
    const [landmark, setLandmark] = useState('');
    const [city, setTown] = useState('');
    const [addressSubmitted, setAddressSubmitted] = useState(false);

    const handleSubmit = async () => {
        try {
            if (!name || !contactNumber || !pinCode || !doorNo || !area || !landmark || !city) {
                throw new Error('Please fill in all fields');
            }

            const mobileRegex = /^[0-9]{10}$/;
            if (!mobileRegex.test(contactNumber)) {
                throw new Error('Invalid mobile number');
            }

            const pinRegex = /^[1-9][0-9]{5}$/;
            if (!pinRegex.test(pinCode)) {
                throw new Error('Invalid PIN code');
            }

            console.log('Address details:', { name, contactNumber, pinCode, doorNo, area, landmark, city });
            Swal.fire('Success', 'Address saved successfully', 'success');
            setName('');
            setArea('');
            setDoorNo('');
            setLandmark('');
            setMobileNumber('');
            setPinCode('');
            setTown('');
            setAddressSubmitted(true); // Set addressSubmitted to true upon successful submission
        } catch (error) {
            console.error('Error saving address:', error.message);
            Swal.fire('Error', error.message, 'error');
        }
    };

    const handlePayment = async () => {
        if (addressSubmitted) { // Check if address is submitted and user is authenticated
            try {
                setPaymentInProgress(true);

                const options = {
                    key: 'rzp_test_OuBzAEm7MsopRx',
                    amount: state.productPrice,
                    currency: 'INR',
                    order_id: 'order_EHY2YUKwdbwFzm', // Sample order ID, replace with actual order ID
                    name: state.productName,
                    description: `Payment for ${state.productName}`,
                    handler: function (response) {
                        const paymentData = {
                            productName: state.productName,
                            amount: state.productPrice,
                            address: {
                                name,
                                contactNumber,
                                pinCode,
                                doorNo,
                                area,
                                landmark,
                                city
                            },
                            paymentID: response.razorpay_payment_id
                        };

                        // Send payment data to the payment URL
                        axios.post('http://localhost:9000/payment/payment', paymentData)
                            .then(response => {
                                console.log('Payment successful:', response.data);
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Payment Successful',
                                    text: `Payment ID: ${response.razorpay_payment_id}`
                                }).then(() => {
                                    // Navigate to receipt page after payment success
                                    navigate('/receipt')
                                });
                            })
                            .catch(error => {
                                console.error('Error processing payment:', error);
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Payment Error',
                                    text: 'An error occurred while processing payment. Please try again later.'
                                });
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
            }
            finally {
                setPaymentInProgress(false);
            }
        } else {
            Swal.fire('Error', 'Please submit your address first', 'error');
        }
    };

    return (
        <>
            <Navbar2 value="Delivery Address" />
            <div className="addressBody">
                <div className="address">
                    <b><Typography variant="h6">Enter your Delivery Address</Typography></b>
                    <MyTextField
                        autoComplete='off'
                        label="Full Name"
                        variant="outlined"
                        InputProps={{ startAdornment: (<BadgeOutlinedIcon style={{ marginRight: "8px" }} />) }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <MyTextField
                        autoComplete='off'
                        label="Mobile Number"
                        variant="outlined"
                        InputProps={{ startAdornment: (<CallOutlinedIcon style={{ marginRight: "8px" }} />) }}
                        value={contactNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                    />
                    <MyTextField
                        autoComplete='off'
                        label="PIN Code"
                        variant="outlined"
                        InputProps={{ startAdornment: (<PinOutlinedIcon style={{ marginRight: "8px" }} />) }}
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                    />
                    <MyTextField
                        autoComplete='off'
                        label="Door No"
                        variant="outlined"
                        InputProps={{ startAdornment: (<SensorDoorOutlinedIcon style={{ marginRight: "8px" }} />) }}
                        value={doorNo}
                        onChange={(e) => setDoorNo(e.target.value)}
                    />
                    <MyTextField
                        autoComplete='off'
                        label="Area, Street, Sector, Village"
                        variant="outlined"
                        InputProps={{ startAdornment: (<SignpostOutlinedIcon style={{ marginRight: "8px" }} />) }}
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                    />
                    <MyTextField
                        autoComplete='off'
                        label="Landmark"
                        variant="outlined"
                        InputProps={{ startAdornment: (<LocationOnOutlinedIcon style={{ marginRight: "8px" }} />) }}
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                    />
                    <MyTextField
                        autoComplete='off'
                        label="Town / City"
                        variant="outlined"
                        InputProps={{ startAdornment: (<LocationCityOutlinedIcon style={{ marginRight: "8px" }} />) }}
                        value={city}
                        onChange={(e) => setTown(e.target.value)}
                    />
                    {!addressSubmitted && (
                        <Button id='next' variant="contained" color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    )}
                    {addressSubmitted && (
                        <Button
                            color='primary'
                            variant='contained'
                            onClick={handlePayment}
                            disabled={paymentInProgress}
                        >
                            {paymentInProgress ? 'Processing Payment...' : 'Click to Pay'}
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
}

export default Address;
