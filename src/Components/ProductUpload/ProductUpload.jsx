import React, { useState } from 'react';
import './ProductUpload.css'
import { Box, Button, Card, CardActions, CardContent, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';

function ProductUpload() {
    const [productName, setProductName] = useState('');
    const [productModel, setProductModel] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [description, setDescription] = useState('');
    const [filename, setImage] = useState();

    const Upload = async (e) => {
        if (!filename || !productName || !productModel || !productPrice || !description) {
            Swal.fire('Error', 'Fill all the fields', 'error');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', filename);
            formData.append('productName', productName);
            formData.append('productModel', productModel);
            formData.append('productPrice', productPrice);
            formData.append('description', description);

            const response = await axios.post('http://localhost:9000/product/upload', formData);

            if (response.status === 201) {
                Swal.fire('Success', 'Uploaded Successfully', 'success');
                setProductName('');
                setProductModel('');
                setDescription('');
                setProductPrice('');
                setImage(null);
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', "Can't Upload", 'error');
        }
    };

    return (
        <div className='box'>
            <Box width='1200px'>
                <Card className='card'>
                    <CardContent>
                        <div className='product-con'>
                            <label>
                                <input type='file' onChange={e=>setImage(e.target.files[0])} hidden />
                                Upload filename
                            </label>
                            <TextField className='pr-name' autoComplete='off' label='Product Name' value={productName} onChange={(e) => setProductName(e.target.value)} />
                            <TextField className='pr-model' autoComplete='off' label='Product Model' value={productModel} onChange={(e) => setProductModel(e.target.value)} />
                            <TextField className='pr-price' autoComplete='off' label='Product Price' type='number' value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                            <TextField className='pr-desc' autoComplete='off' label='Product Description' multiline maxRows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    </CardContent>
                    <CardActions className='action'>
                        <Button variant='contained' color='primary' id='upload' onClick={Upload}>
                            Upload
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </div>
    );
}

export default ProductUpload;
