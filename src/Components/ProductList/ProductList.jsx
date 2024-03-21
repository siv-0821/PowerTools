import React, { useState, useEffect } from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Navbar from '../Navbar/Navbar'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./ProductList.css"
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function ProductList() {
  const [rows, setRows] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedFields, setEditedFields] = useState({});

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
    setEditedFields({ ...product });
  };
  //Edit & Delete Modal Backdrop
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
      const response = await axios.put(`http://localhost:9000/product/${editProduct._id}`, editedFields);
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
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Navbar value="Product List" />
      <div className="productListBody">
        <div className='productList'>
          <Link to="/productupload">
            <Button variant="contained" className='add'>Add</Button>
          </Link>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>S.No</StyledTableCell>
                  <StyledTableCell>Product Name</StyledTableCell>
                  <StyledTableCell>Product Model</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
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
                      <EditIcon id="edit" onClick={() => handleEdit(row)} />&nbsp;&nbsp;&nbsp;
                      <DeleteIcon id="delete" onClick={() => handleEditDelete(row._id)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Modal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <h2 id="modal-modal-title">Edit Product</h2><br />
          <TextField
            label="Product Name"
            name="productName"
            value={editedFields.productName || ''}
            onChange={handleFieldChange}
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
            label="Product Model"
            name="productModel"
            value={editedFields.productModel || ''}
            onChange={handleFieldChange}
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
            label="Amount"
            name="productPrice"
            value={editedFields.productPrice || ''}
            onChange={handleFieldChange}
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
            label="Description"
            name="description"
            value={editedFields.description || ''}
            onChange={handleFieldChange}
            fullWidth
            sx={{ mb: 3 }}
          />
          <center>
            <Button variant="contained" onClick={handleEditSave} color="success">Update</Button>&nbsp;&nbsp;&nbsp;
            <Button variant="contained" onClick={() => setOpenEditModal(false)} color="error">Cancel</Button>
          </center>

        </Box>
      </Modal>

    </div>
  );
}

export default ProductList;
