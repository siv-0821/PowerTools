import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const response = await axios.post('http://localhost:assuts/img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h2>Upload an Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImageUpload;
