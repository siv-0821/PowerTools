import './Home.css';
import Navbar from '../Navbar/Navbar';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Home({ card, setCard }) {

  const cardData = [
    { id: 1, title: 'Card 1', image: 'https://source.unsplash.com/random', model: 'Description for Card 1',rate:1000 },
    { id: 2, title: 'Card 2', image: 'https://source.unsplash.com/random', desc: 'Description for Card 2' },
    { id: 3, title: 'Card 3', image: 'https://source.unsplash.com/random', desc: 'Description for Card 3' },
    { id: 4, title: 'Card 4', image: 'https://source.unsplash.com/random', desc: 'Description for Card 4' },
    { id: 5, title: 'Card 5', image: 'https://source.unsplash.com/random', desc: 'Description for Card 5' },
    { id: 6, title: 'Card 6', image: 'https://source.unsplash.com/random', desc: 'Description for Card 6' },
    { id: 7, title: 'Card 7', image: 'https://source.unsplash.com/random', desc: 'Description for Card 7' }
  ]
  return (
    <>
      <Navbar />
      <div className='home-page'>
        <div className='product-card'>
          {cardData.map(card => (
            <div >
              <Card key={card.id} >
                <Link to={`/productdetails/${card.id}`}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={card.image}
                    alt={card.title}
                  />
                  <CardContent>
                    <Typography variant='h5'>{card.title}</Typography>
                    <Typography>Model : {card.model}</Typography>
                    <Typography>Price : ₹ {card.rate}</Typography>
                  </CardContent>
                </Link>
                <CardActions>

                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
