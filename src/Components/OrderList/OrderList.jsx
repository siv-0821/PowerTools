import './OrderList.css';
import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

function OrderList() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/purchase/purchase");
        if (response.status === 200) {
          setRows(response.data);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        Swal.fire('Error!', error.message || 'Something went wrong!', 'error');
      }
    };

    fetchData();
  }, []);


  return (
    <>

      <div className='orderListBody'>
        <div className='orderList'>
          {rows.map((row, index) => (
            <Accordion className="no" key={`id${index}`}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
              >
                <Typography variant="h7" className="from">
                  <div><b>{row.name}</b> </div>
                  <div ><b>Order ID : </b>{row.orderID} </div>
                  <div>{row.purchaseDate} </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div style={{ textAlign: 'left' }}><b>Product :</b> {row.productName}</div>
                <div style={{ textAlign: 'left' }}><b>Model :</b> {row.productModel}</div>
                <div style={{ textAlign: "left" }}><b>Payment ID : </b>{row.paymentID}</div>
                <div style={{ textAlign: "left" }}><b>Amount : </b>{row.amount}</div>
                <div style={{ textAlign: "left" }}><b>Address : </b>{row.doorNo}, {row.landmark}, {row.area}, {row.pinCode}, {row.city}</div>
                <div style={{ textAlign: "left" }}><b>Contact Number : </b>{row.mobileNumber}</div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </>
  );
}

export default OrderList;
