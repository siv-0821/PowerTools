/* import React, { useContext } from 'react'
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
function App() {
  const{role}=useContext(DataContext);
  return (
    <div>
      <Routes>
        <Route path='/' Component={Login}/>
        <Route path='/signup' Component={Signup}/>
        <Route path='/forget' Component={ForgetPass}/>
        <Route path='/otp' Component={Otp}/>
        <Route path='/resetpass' Component={ResetPass}/>
        <Route path='/home' Component={Home}/>
        <Route path='/productlist' Component={ProductList}/>
      </Routes>
      
    </div>
  )
}

export default App
