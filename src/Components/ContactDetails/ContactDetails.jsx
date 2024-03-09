import NavBar from "../Navbar/Navbar"
import './ContactDetails.css'
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from "@mui/material";

function ContactDetails() {
    return (
        <>
            <NavBar value='Newsletters' />
            <div className="contactdetail-body">

                <div className="messages">
                    <Accordion className="no">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography variant="h7" className="from">
                                <div> Aravind</div>
                                <div className="mail">From : aravind@gmail.com</div>
                                <div>9 Mar 2024</div>
                            </Typography>

                        </AccordionSummary>
                        <AccordionDetails>
                            Hello
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </>
    )
}
export default ContactDetails