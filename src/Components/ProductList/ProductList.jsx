import React, { useState, useEffect } from 'react';
import { Box, Card, CardActions, CardContent, Button, Modal, TextField } from '@mui/material';
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
import { Link } from 'react-router-dom';
//import Navbar from '../Navbar/Navbar';

function ProductList() {
  const [rows, setRows] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:9000/product");
      if (response.status === 200) {
        setRows(response.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      Swal.fire('Error!', error.message || 'Something went wrong!', 'error');
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setOpenEditModal(true);
  };

  const handleEditDelete = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:9000/product/${productId}`);
      if (response.status === 200) {
        setOpenEditModal(false);
        fetchData();
        Swal.fire('Success!', 'Product deleted successfully!', 'success');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      Swal.fire('Error!', error.message || 'Something went wrong!', 'error');
    }
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.put(`http://localhost:9000/product/${editProduct._id}`, editProduct);
      if (response.status === 200) {
        setOpenEditModal(false);
        fetchData();
        Swal.fire('Success!', 'Product updated successfully!', 'success');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      Swal.fire('Error!', error.message || 'Something went wrong!', 'error');
    }
  };

  const handleEditCancel = () => {
    setEditProduct(null);
    setOpenEditModal(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      
      <Box width='1200px'>
        <Card>
          <CardContent>
            <h3>+</h3>
            <div>
              <TableContainer component={Paper}>
                <Table >
                  <TableHead>
                    <TableRow>
                      <TableCell>S.No</TableCell>
                      <TableCell >Product Name</TableCell>
                      <TableCell >Product Model</TableCell>
                      <TableCell >Amount</TableCell>
                      <TableCell >Description</TableCell>
                      <TableCell >Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">{index + 1}</TableCell>
                        <TableCell align="left">{row.productName}</TableCell>
                        <TableCell align="left">{row.productModel}</TableCell>
                        <TableCell align="left">{row.productPrice}</TableCell>
                        <TableCell align="left">{row.description}</TableCell>
                        <TableCell align="left">
                          <EditIcon onClick={() => handleEdit(row)} />
                          <DeleteIcon onClick={() => handleEditDelete(row._id)} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </CardContent>
          <CardActions>
            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
              <h3>+</h3>
            </Link>
          </CardActions>
        </Card>
      </Box>
      <Modal open={openEditModal} onClose={handleEditCancel}>
        <Box>
          <h2>Edit Product</h2>
          <TextField
            label="Product Name"
            value={editProduct?.productName || ''}
            onChange={(e) => setEditProduct((prev) => ({ ...prev, productName: e.target.value }))}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Product Model"
            value={editProduct?.productModel || ''}
            onChange={(e) => setEditProduct((prev) => ({ ...prev, productModel: e.target.value }))}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Amount"
            value={editProduct?.productPrice || ''}
            onChange={(e) => setEditProduct((prev) => ({ ...prev, productPrice: e.target.value }))}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={editProduct?.description || ''}
            onChange={(e) => setEditProduct((prev) => ({ ...prev, description: e.target.value }))}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleEditSave}>Save</Button>
          <Button variant="outlined" onClick={handleEditCancel}>Cancel</Button>
        </Box>
      </Modal>
      </div>
    
  );
}

export default ProductList;
