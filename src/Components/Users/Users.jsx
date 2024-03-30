import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Users.css'; // Import CSS file for styling
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Typography, Table, TableContainer, TableHead, TableBody, TableRow, Paper } from '@mui/material';

function Dashboard() {
  const [newsletterCount, setNewsletterCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [users, setUsers] = useState([]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  useEffect(() => {
    // Fetch newsletter count from backend API
    axios.get('http://localhost:9000/newsletter/newsletter')
      .then(response => {
        setNewsletterCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching newsletter count:', error);
      });

    // Fetch user count from backend API
    axios.get('http://localhost:9000/auth/userCount')
      .then(response => {
        setUserCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching user count:', error);
      });

    // Fetch order count from backend API
    axios.get('http://localhost:9000/purchase/ordercount')
      .then(response => {
        setOrderCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching order count:', error);
      });

    // Fetch feedback count from backend API
    axios.get('http://localhost:9000/feedback/feedbackCount')
      .then(response => {
        setFeedbackCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching feedback count:', error);
      });

    // Fetch users from backend API
    axios.get('http://localhost:9000/auth/getAllUsers')
      .then(response => {
        setUsers(response.data.users);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      <div className="count-container">
        <div className="count-card">
          <PeopleOutlineIcon style={{ fontSize: '50px' }} />
          <Typography variant='h2'>{userCount}</Typography>
          <Typography variant="h4">Users</Typography>
        </div>
        <div className="count-card">
          <LocalMallIcon style={{ fontSize: '50px' }} />
          <Typography variant='h2'>{orderCount}</Typography>
          <Typography variant="h4">Orders</Typography>
        </div>
        <div className="count-card">
          <MailOutlineIcon style={{ fontSize: '50px' }} />
          <Typography variant='h2'>{newsletterCount}</Typography>
          <Typography variant="h4">Newsletters</Typography>
        </div>
        <div className="count-card">
          <ThumbUpOffAltIcon style={{ fontSize: '50px' }} />
          <Typography variant='h2'>{feedbackCount}</Typography>
          <Typography variant="h4">Feedbacks</Typography>
        </div>
      </div>
      <br/>
      <div className="user-table">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align='center'>ID</StyledTableCell>
                <StyledTableCell align='center'>User Name</StyledTableCell>
                <StyledTableCell align='center'>Email</StyledTableCell>
                <StyledTableCell align='center'>Created at</StyledTableCell>
                {/* Add more table headings as needed */}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user._id}>
                  <StyledTableCell align='center'>{user._id}</StyledTableCell>
                  <StyledTableCell>{user.username}</StyledTableCell>
                  <StyledTableCell>{user.email}</StyledTableCell>
                  {/* Add more table cells for other user details */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Dashboard;
