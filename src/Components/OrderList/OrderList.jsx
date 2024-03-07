import React, { useState, useEffect } from 'react';
import { Box, Card, CardActions, CardContent } from '@mui/material';

import './OrderList.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Swal from 'sweetalert2';

function OrderList() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/purchase/purchase");
        if (response.status === 200) {
          setRows(response.data); // Assuming response.data is an array of purchases
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
    <div>
      
      <Box width='1200px'>
        <Card>
          <CardContent>
            <div>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell>S.No</TableCell>
                      <TableCell align="right">CustomerID</TableCell>
                      <TableCell align="right">Customer Name</TableCell>
                      <TableCell align="right">Product ID</TableCell>
                      <TableCell align="right">Product Name</TableCell>
                      <TableCell align="right">Delivered by</TableCell>
                      <TableCell align="right">Ordered at</TableCell>
                      <TableCell align="right">Actions</TableCell>
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
                        <TableCell align="left">{row.deliveryPerson}</TableCell>
                        <TableCell align="left">{row.purchaseDate}</TableCell>
                        <TableCell align="left">
                          <EditIcon style={{ color: 'green', cursor: 'pointer' }} />
                          <DeleteIcon style={{ color: 'red', cursor: 'pointer', marginLeft: '5px' }} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Box>
      </div>
  );
}

export default OrderList;
