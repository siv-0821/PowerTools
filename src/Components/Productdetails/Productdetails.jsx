import { useParams } from 'react-router-dom'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import './Productdetails.css'

const data = [
  { id: 1, title: 'Card 1', image: 'https://source.unsplash.com/random', desc: 'Description for Card 1' },
  { id: 2, title: 'Card 2', image: 'https://source.unsplash.com/random', desc: 'Description for Card 2' },
  { id: 3, title: 'Card 3', image: 'https://source.unsplash.com/random', desc: 'Description for Card 3' },
  { id: 4, title: 'Card 4', image: 'https://source.unsplash.com/random', desc: 'Description for Card 4' },
  { id: 5, title: 'Card 5', image: 'https://source.unsplash.com/random', desc: 'Description for Card 5' },
  { id: 6, title: 'Card 6', image: 'https://source.unsplash.com/random', desc: 'Description for Card 6' },
  { id: 7, title: 'Card 7', image: 'https://source.unsplash.com/random', desc: 'Description for Card 7' }

]
function Productdetails() {
  const { id } = useParams()
  const product = data.find(p => p.id === parseInt(id));


  return (

    <div className="over-body">
      <div className="over-head">

        <Box width="300px">

          <Card>
            <CardMedia
              component="img"
              height="140"
              image={product.image}
              alt="overview" />
            <CardContent>
              <Typography variant="h5" gutterBottom>{product.title}</Typography>
              <Typography variant="body2" gutterBottom component="div">{product.desc}</Typography>
            </CardContent>
            <CardActions>
            <Button variant='contained' color='primary'>Buy Now</Button>
            </CardActions>
          </Card>
        </Box>
      </div>
    </div>
  )
}

export default Productdetails
