import { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';
import {
  Assignment as AssignmentIcon,
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon,
  GridOn as ProductIcon, 
  CloudUpload as UploadIcon, 
  StarOutline as FeedbackIcon, 
  ListAlt as OrdersIcon 
} from '@mui/icons-material';
import './Sidebar.css';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const routes = [
    {path: '', name: 'User' ,icon:<UploadIcon /> },
    { path: 'productlist', name: 'ProductList', icon: <ProductIcon /> },
    { path: 'order', name: 'Order', icon: <AssignmentIcon /> },
    { path: 'orderlist', name: 'OrderList', icon: <OrdersIcon /> },
    { path: 'productupload', name: 'ProductUpload', icon: <UploadIcon /> },
    { path: 'feedbackdetails', name: 'FeedbackDetails', icon: <FeedbackIcon /> },
    { path: 'contactdetails', name: 'ContactDetails', icon: <AccountCircleIcon /> }
  ];

  return (
    <div className='side-body'>
      <motion.div animate={{ width: isOpen ? '200px' : '80px' }} className='sidebar'>
        <div className='side-menu'>
          {isOpen && <Typography variant='h5' gutterBottom>Dashboard</Typography>}
          <div id='menu'>
            <MenuIcon onClick={toggleSidebar} style={{marginRight:'10px'}}/>
          </div>
        </div>
        <section className='side-icon'>
          {routes.map(route => (
            <NavLink to={route.path} key={route.name} className='link'>
              <div>{route.icon}</div>
              {isOpen && <div>{route.name}</div>}
            </NavLink>
          ))}
        </section>
      </motion.div>
      <main>{children}</main>
    </div>    
  );
};

export default Sidebar;
