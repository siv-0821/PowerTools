import React, { useContext } from 'react';
import DataContext from '../../DataContext';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Overview from '../Overview/Overview';

function Home() {
  const { setShowNavbar } = useContext(DataContext);

  // Assuming you have some data for multiple cards
  const cardData = [
    { id: 1, title: 'Card 1', image: 'https://source.unsplash.com/random', desc: 'Description for Card 1' },
    { id: 2, title: 'Card 2', image: 'https://source.unsplash.com/random', desc: 'Description for Card 2' },
    { id: 3, title: 'Card 2', image: 'https://source.unsplash.com/random', desc: 'Description for Card 2' },
    { id: 4, title: 'Card 2', image: 'https://source.unsplash.com/random', desc: 'Description for Card 2' },
    { id: 5, title: 'Card 2', image: 'https://source.unsplash.com/random', desc: 'Description for Card 2' },
    { id: 6, title: 'Card 2', image: 'https://source.unsplash.com/random', desc: 'Description for Card 2' },
    { id: 7, title: 'Card 3', image: 'https://source.unsplash.com/random', desc: 'Description for Card 3' }
    // Add more card data as needed
  ];

  setShowNavbar(true);

  return (
    <div className='home'>
      <Navbar id="nav" />
      <div className='home-page'>
        <div className='product-card'>
          
          {cardData.map(card => (
            <Overview>
              <Card key={card.id}>
              <CardMedia
                component="img"
                height="200"
                image={card.image}
                alt={card.title}
              />
              <CardContent>
                <Typography variant='h5'>{card.title}</Typography>
                <Typography>{card.desc}</Typography>
              </CardContent>
              <CardActions>
                <Button variant='small' component={Link} to={`/overview/${card.id}`}>View</Button>
                <Button variant='small'>Buy</Button>
              </CardActions>
            </Card>
            </Overview>
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default Home;
