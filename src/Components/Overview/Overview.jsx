import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import './Overview.css'
import { useParams } from "react-router-dom"
function Overview() {
    const {id}=useParams()
    return (
        <div className="over-body">
            <div className="over-head">
                <Box width="300px">
                <Card>
                    <CardMedia
                    component="img"
                    height="140"
                    image="https://source.unsplash.com/random"
                    alt="overview" />
                    <CardContent>
                        <Typography variant="h5" gutterBottom>{id}abc</Typography>
                        <Typography variant="body2" gutterBottom>Subject to the license terms for the software, you may redistribute the .EXE files (unmodified) listed below. 
These files can be run as prerequisites during installation.</Typography>
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
