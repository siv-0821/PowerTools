import './ContactDetails.css'
import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

function ContactDetails() {
   
    const [rows, setRows] = useState([])
    useEffect(() => {
        const getdata = async () => {
            try {
                const response = await axios.get('http://localhost:9000/newsletter/newsletter');
                const data = response.data.newsletters;
                setRows(data);
                
            } catch (error) {
                Swal.fire('Error!', error.message || 'Something went wrong!', 'error');
            }
        };

        getdata();
    }, [])
    return (
        <>
            <div className="contactdetailsbody" >
                <div className="messages">
                <Typography variant="h3" className='heading'>Contact Details</Typography><br/><br/>
                    {rows.map((row, index) => (
                        <Accordion className="no" key={`id${index}`}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index + 1}-content`}
                                id={`panel${index + 1}-header`}
                            >
                                <Typography variant="h7" className="from">
                                    <div><b>{row.name} </b></div>
                                    <div ><b>From : </b>{row.email} </div>
                                    <div>{row.createdAt} </div>
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{textAlign:"left"}}>
                                <b>Message : </b>{row.message}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </div>
        </>
    )
}
export default ContactDetails
