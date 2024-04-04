import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Box, Button, Card, CardActions, CardContent, TextField } from '@mui/material';
import './ProductUpload.css'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
function ProductUpload() {

    const [productName, setproductName] = useState()
    const [productModel, setproductModel] = useState()
    const [productPrice, setproductPrice] = useState()
    const [description, setdescription] = useState()
    const [filename, setFilename] = useState()

    /* const imasgee = async(e) => {
        const data=e.target.files[0]
        setfilename(data)
        
        try{
            const filenameData=new filenameData()
            filenameData.append('filename',data)
            const filenamefile=await axios.post('/assuts/img',filenameData)
            console.log("Success");
        }
        catch{
                console.log("No");
        }
    }
    
 */
    const Upload = async () => {
        if (!filename || !productName || !productModel || !productPrice || !description) {
            Swal.fire('Error', 'Fill all the fields', 'error')
            return
        }
        try {
            const response = await axios.post('http://localhost:9000/product/upload', { productName, productModel, productPrice, description,filename })
            Swal.fire('success', 'Uploaded Successfully', 'success')
            setproductName('')
            setproductModel('')
            setdescription('')
            setproductPrice('')
            setFilename('')
        }
        catch (error) {
            Swal.fire('Error',"Can't Upload",'error')
        }
    }
    return (
        <>
            <div className='box'>
            
                <Box width='1200px'>
                    <Card className='card'>
                        <CardContent>
                            <div className='product-con'>
                                
                               <Button 
                               variant='contained' 
                               color='primary'
                               value={filename}
                               onChange={(e)=>setFilename(e.target.value)} 
                               startIcon={<UploadFileIcon />}><label><input type='file' hidden/>Upload filename</label></Button>
                                
                                <TextField className='pr-name' autoComplete='off' label='Product Name' value={productName} onChange={(e) => setproductName(e.target.value)} />
                                <TextField className='pr-model' autoComplete='off' label='Product Model' value={productModel} onChange={(e) => setproductModel(e.target.value)} />
                                <TextField className='pr-price' autoComplete='off' label='Product Price' type='number' value={productPrice} onChange={(e) => setproductPrice(e.target.value)} />
                                <TextField className='pr-desc' autoComplete='off' label='Product Description' multiline maxRows={5} value={description} onChange={(e) => setdescription(e.target.value)} />
                            </div>
                        </CardContent>
                        <CardActions className='action'>
                            <Button variant='contained' color='primary' id="upload" onClick={Upload}>Upload</Button>
                        </CardActions>
                    </Card>
                </Box>
            </div>
        </>
    )
}
export default ProductUpload