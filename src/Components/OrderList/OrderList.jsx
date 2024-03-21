import React, { useState, useEffect } from 'react';
import './OrderList.css'
import Navbar from "../Navbar/Navbar"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Swal from 'sweetalert2';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

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
      <Navbar value="Order List" />
      <div className='orderListBody'>
        <div className='orderList'>

          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>S.No</StyledTableCell>
                  <StyledTableCell align="left">CustomerID</StyledTableCell>
                  <StyledTableCell align="left">Customer Name</StyledTableCell>
                  <StyledTableCell align="left">Product ID</StyledTableCell>
                  <StyledTableCell align="left">Product Name</StyledTableCell>
                  <StyledTableCell align="left">Ordered at</StyledTableCell>
                  <StyledTableCell align='left'>Payment Mode</StyledTableCell>
                  <StyledTableCell align='left'>Amount</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">{row.customerID}</TableCell>
                    <TableCell align="left">{row.customerName}</TableCell>
                    <TableCell align="left">{row.productID}</TableCell>
                    <TableCell align="left">{row.productName}</TableCell>
                    
                    <TableCell align="left">{row.purchaseDate}</TableCell>
                    <TableCell align="left">{row.paymentMode}</TableCell>
                    <TableCell align="left">{row.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default OrderList;
