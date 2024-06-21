import { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import ThumbUpAltSharpIcon from '@mui/icons-material/ThumbUpAltSharp';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Menu as MenuIcon,
  GridOn as ProductIcon, 
  CloudUpload as UploadIcon, 
  ListAlt as OrdersIcon 
} from '@mui/icons-material';
import './Sidebar.css';
import { Cookies } from 'react-cookie';

const Sidebar = ({ children }) => {
  const navigate=useNavigate()
  const cookie = new Cookies();
  const [isLoggedIn, setIsLoggedIn] = useState(!!cookie.get('admintoken'));
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    cookie.remove('admintoken');
    setIsLoggedIn(false);
    // Navigate to the admin login page
    navigate('/admin'); // Adjust the path as per your route setup
  };

  const routes = [
    { path: '',                name: 'Dashboard' ,        icon: <DashboardIcon/> },
    { path: 'productlist',     name: 'Product List',      icon: <ProductIcon /> },
    { path: 'order',           name: 'Order to Dealer',   icon: <ShoppingCartIcon /> },
    { path: 'orderlist',       name: 'Order List',        icon: <OrdersIcon /> },
    { path: 'productupload',   name: 'Product Upload',    icon: <UploadIcon /> },
    { path: 'feedbackdetails', name: 'Feedback Details',  icon: <ThumbUpAltSharpIcon /> },
    { path: 'contactdetails',  name: 'Contact Details',   icon: <MarkEmailReadOutlinedIcon/> }
  ];

  return (
    <div className='side-body'>
      <motion.div animate={{ width: isOpen ? '300px' : '80px' }} className='sidebar'>
        <div className='side-menu'>
          {isOpen && <Typography variant='h5' gutterBottom><center><b>R&R Power Tools</b></center></Typography>}
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
          {isLoggedIn && (
            <div className='link' onClick={logout}>
              <div><LogoutIcon /></div>
              {isOpen && <div>Logout</div>}
            </div>
          )}
        </section>
      </motion.div>
      <main>{children}</main>
    </div>    
  );
};

export default Sidebar;
