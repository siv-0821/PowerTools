import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Home({ card, setCard }) {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/product'); // Replace YOUR_BACKEND_URL with your actual backend URL
        setCardData(response.data);
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };

    fetchCardData();

    // Cleanup function
    return () => {
      // Cleanup code if necessary
    };
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  return (
    <>
      <Navbar />
      <div className='home'>
        <div className='home-page'>
          <div className='product-card'>
            {cardData.map(card => (
              <div key={card.id} className='card'>
                <Card>
                  <Link to={`/productdetails/${card.id}`}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={card.Image}
                      alt={card.productName}
                    />
                    <CardContent>
                      <Typography variant='h5'>{card.productName}</Typography>
                      <Typography>{card.description}</Typography>
                    </CardContent>
                  </Link>
                  <CardActions>{/* You can add card actions here if needed */}</CardActions>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
