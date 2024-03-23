import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Box, Button, Card, CardActions, CardContent, TextField } from '@mui/material';
import './ProductUpload.css'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
function ProductUpload() {

    const [proName, setProName] = useState()
    const [proModel, setProModel] = useState()
    const [proPrice, setProPrice] = useState()
    const [proDesc, setProDesc] = useState()
    const [imgUpload, setImgUpload] = useState()

    const image = async(e) => {
        setImgUpload(e.target.files[0])
        await axios.post('/assets/img',{image})
    }

    const Upload = async () => {
        if (!imgUpload || !proName || !proModel || !proPrice || !proDesc) {
            Swal.fire('Error', 'Fill all the fields', 'error')
            return
        }
        try {
            const response = await axios.post('http://localhost:9000/', { proName, proModel, proPrice, proDesc })
            Swal.fire('success', 'Uploaded Successfully', 'success')
        }
        catch (error) {
            Swal.fire('')
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
                               onChange={image} 
                               startIcon={<UploadFileIcon />}><label><input type='file' hidden/>Upload Image</label></Button>
                                
                                <TextField className='pr-name' autoComplete='off' label='Product Name' value={proName} onChange={(e) => setProName(e.target.value)} />
                                <TextField className='pr-model' autoComplete='off' label='Product Model' value={proModel} onChange={(e) => setProModel(e.target.value)} />
                                <TextField className='pr-price' autoComplete='off' label='Product Price' type='number' value={proPrice} onChange={(e) => setProPrice(e.target.value)} />
                                <TextField className='pr-desc' autoComplete='off' label='Product Description' multiline maxRows={5} value={proDesc} onChange={(e) => setProDesc(e.target.value)} />
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