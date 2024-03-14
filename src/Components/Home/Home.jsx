import React, { useContext } from 'react';
import DataContext from '../../DataContext';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

function Home() {
  const { setShowNavbar } = useContext(DataContext);

  // Assuming you have some data for multiple cards
  const cardData = [
    { id: 1, title: 'Card 1', image: 'https://via.placeholder.com/150', description: 'Description for Card 1' },
    { id: 2, title: 'Card 2', image: 'https://via.placeholder.com/150', description: 'Description for Card 2' },
    { id: 2, title: 'Card 2', image: 'https://via.placeholder.com/150', description: 'Description for Card 2' },
    { id: 2, title: 'Card 2', image: 'https://via.placeholder.com/150', description: 'Description for Card 2' },
    { id: 2, title: 'Card 2', image: 'https://via.placeholder.com/150', description: 'Description for Card 2' },
    { id: 2, title: 'Card 2', image: 'https://via.placeholder.com/150', description: 'Description for Card 2' },
    { id: 3, title: 'Card 3', image: 'https://via.placeholder.com/150', description: 'Description for Card 3' }
    // Add more card data as needed
  ];

  setShowNavbar(true);

  return (
    <div className='home'>
      <Navbar id="nav" />
      <div className='home-page'>
        <div className='product-card'>
          {cardData.map(card => (
            <Card key={card.id}>
              <CardMedia
                component="img"
                height="200"
                image={card.image}
                alt={card.title}
              />
              <CardContent>
                <Typography variant='h5'>{card.title}</Typography>
                <Typography>{card.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
