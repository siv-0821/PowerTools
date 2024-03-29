import React from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; // Import jspdf-autotable
import { Typography, Button } from '@mui/material';
import './Receipt.css';

const PDF = () => {
    const receiptData = {
        orderId: '123456',
        paymentId: 'PAYMENT123',
        Totalamount: '40.00',
        products: [
            { name: 'Angle Grinder', quantity: 2, amount:7738,orderat: '23-MAR-2024' },
        ]
    };

    const generatePdf = () => {
        const doc = new jsPDF();
    
        // Set font style
        doc.setFont('helvetica');
    
        // Set font size
        doc.setFontSize(12);
    
        // Set font color
        doc.setTextColor(0, 0, 0); // Black color
    
        // Add content
        doc.text('R&R Power Tools, Thiruchendur', 10, 10);
        doc.text('Order Receipt', 10, 20);
        doc.text(`Order ID: ${receiptData.orderId}`, 10, 30);
        doc.text(`Payment ID: ${receiptData.paymentId}`, 10, 40);
    
        // Products table
        doc.text('Product Details:', 10, 60);
        autoTable(doc, {
            startY: 70,
            head: [['Product Name', 'Quantity', 'Amount']],
            body: receiptData.products.map(product => [product.name, product.quantity, product.Totalamount]),
            theme: 'grid'
        });
    
        // End of statement
        doc.text('Thank you for shopping with us!', 10, doc.autoTable.previous.finalY + 10);
    
        // Save PDF
        doc.save('receipt.pdf');
    };
    
    return (
        <div className="receipt">
            <div className='receipt-body'>
                <div className="receipt-container">
                    <center><Typography variant="h4">Receipt</Typography></center><br />
                    <div className="receipt-details">
                        <p><b>Order ID : </b>{receiptData.orderId}</p>
                        <p><b>Payment ID : </b> {receiptData.paymentId}</p>
                        <p><b>Amount : </b> ₹ {receiptData.Totalamount}</p>
                        <ol>
                            {receiptData.products.map((product, index) => (
                                <li key={index}>
                                    <b>Product Name :</b> {product.name} <br />
                                    <b>Quantity :</b>  {product.quantity}<br />
                                    <b>Ordered at : </b>{product.orderat}
                                </li>
                            ))}
                        </ol>
                    </div><br/>
                    <center><Button variant="contained" color="success" onClick={generatePdf}>Get Receipt</Button></center>
                </div>
            </div>
        </div>
    );
};

export default PDF;
