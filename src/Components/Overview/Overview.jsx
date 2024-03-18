import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import './Overview.css'
function Overview(props) {


    return (
        <div className="over-body">
            <div className="over-head">
                <Box width="300px">
                    <Card key={props.id}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={props.image}
                            alt="overview" />
                        <CardContent>
                            <Typography variant="h5" gutterBottom></Typography>
                            <Typography variant="body2" gutterBottom>{props.title}</Typography>
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
