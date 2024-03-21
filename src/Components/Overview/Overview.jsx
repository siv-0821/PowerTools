import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import './Overview.css'
function Overview({id,image,title,desc}) {


    return (
        <div className="over-body">
            <div className="over-head">
                <Box width="300px">
                    <Card key={id}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={image}
                            alt="overview" />
                        <CardContent>
                            <Typography variant="h5" gutterBottom></Typography>
                            <Typography variant="body2" gutterBottom component="div">{title}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">View</Button>
                            <Button size="small">Buy</Button>
                        </CardActions>
                    </Card>
                </Box>
            </div>
        </div>
    )
}

export default Overview
