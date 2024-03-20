/*import React, { useContext } from 'react'
import DataContext from './DataContext'
import Navbar from './Components/Navbar/Navbar';
import {  Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';

function App() {
  const {showNavbar,navigate ,setShowNavbar}  = useContext(DataContext);
  
  return (
    <div>

     {showNavbar?<Navbar/>:<></>} 

     <Routes>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
 */

import React, { useContext } from 'react'
import Login from './Components/Login/Login'
import { Route, Routes } from 'react-router-dom'
import Signup from './Components/Signup/Signup'
import ForgetPass from './Components/ForgetPassword/Forgetpass'
import Otp from './Components/Otp/Otp'
import ResetPass from './Components/ResetPass/ResetPass'
import DataContext from './DataContext'
import Home from './Components/Home/Home'
import ProductList from './Components/ProductList/ProductList'
import OrderList from './Components/OrderList/OrderList'
import Contact from './Components/Contact/Contact'
import ContactDetails from "./Components/ContactDetails/ContactDetails"
import Feedback from './Components/Feedback/Feedback'
import Auth from './Auth/Auth'
import ProductUpload from './Components/ProductUpload/ProductUpload'
import Overview from './Components/Overview/Overview'
import FeedbackDetails from './Components/FeedbackDetails/FeedbackDetails'
import Order from './Components/Order/Order'
import Address from './Components/Address/Address'
function App() {
  const { role } = useContext(DataContext);
  return (
    <div>
      <Routes>
        <Route Component={Auth}>
          <Route path='/' Component={Login} />
          <Route path='forget' Component={ForgetPass} />
          <Route path='otp' Component={Otp} />
          <Route path='resetpass' Component={ResetPass} />
        </Route>
        <Route path='/signup' Component={Signup} /> 
        <Route path='/home' Component={Home} />
        <Route path='/productlist' Component={ProductList} />
        <Route path='/orderlist' Component={OrderList} />
        <Route path='/contact' Component={Contact} />
        <Route path='/contactdetails' Component={ContactDetails} />
        <Route path='/feedback' Component={Feedback} />
        <Route path='/productupload' Component={ProductUpload} />
        <Route path='/overview/:id' Component={Overview} />
        <Route path='/feedbackdetails' Component={FeedbackDetails} />
        <Route path='/order' Component={Order}/>
        <Route path='/address' Component={Address}/>
      </Routes>
    </div >
  )
}

export default App
