import NavBar from "../Navbar/Navbar"
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
                const response = await axios.get('http://localhost:9000/newsletter/newsletter')
                setRows(response.data.newsletters)
            }
            catch (error) {
                Swal.fire('Error!', error.message || 'Something went wrong!', 'error');
            }
        }
        getdata()
    }, [])

    return (
        <>
            <NavBar value='Newsletters' />
            <div className="body" >
                <div className="messages">
                    {rows.map((row, index) => (
                        <Accordion className="no" key={`id${index}`}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index + 1}-content`}
                                id={`panel${index + 1}-header`}
                            >
                                <Typography variant="h7" className="from">
                                    <div>{row.name} </div>
                                    <div className="mail">From:{row.email} </div>
                                    <div>{row.createdAt} </div>
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {row.message}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </div>
        </>
    )
}
export default ContactDetails