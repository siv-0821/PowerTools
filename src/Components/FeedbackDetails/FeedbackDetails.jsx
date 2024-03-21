import './FeedbackDetails.css';
import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

function FeedbackDetails() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9000/feedback/feedback');
                setRows(response.data);
            } catch (error) {
                Swal.fire('Error!', error.message || 'Something went wrong!', 'error');
            }
        };
        fetchData();
    }, []);

    return (
        <>
            
            <div className="feedbackdetailsbody">
                <div className="feedbacks">
                    {rows.map((row, index) => (
                        <Accordion className="no" key={`id${index}`}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index + 1}-content`}
                                id={`panel${index + 1}-header`}
                            >
                                <Typography variant="h7" className="from">
                                    <div><b>{row.name}</b> </div>
                                    <div ><b>From : </b>{row.email} </div>
                                    <div>{row.createdAt} </div>
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div style={{textAlign:'left'}}><b>Feedback :</b> {row.message}</div>
                                <div style={{textAlign:'left'}}><b>Ratings :</b> {row.ratings}</div>
                                <div style={{textAlign:"left"}}><b>Contact Number : </b>{row.phoneNumber}</div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </div>
        </>
    );
}

export default FeedbackDetails;
