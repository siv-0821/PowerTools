import Login from './Components/Login/Login'
import { Route, Routes } from 'react-router-dom'
import Signup from './Components/Signup/Signup'
import ForgetPass from './Components/ForgetPassword/Forgetpass'
import Otp from './Components/Otp/Otp'
import ResetPass from './Components/ResetPass/ResetPass'
import Home from './Components/Home/Home'
import ProductList from './Components/ProductList/ProductList'
import OrderList from './Components/OrderList/OrderList'
import Contact from './Components/Contact/Contact'
import ContactDetails from "./Components/ContactDetails/ContactDetails"
import Feedback from './Components/Feedback/Feedback'
import Auth from './Auth/Auth'
import ProductUpload from './Components/ProductUpload/ProductUpload'
import FeedbackDetails from './Components/FeedbackDetails/FeedbackDetails'
import Order from './Components/Order/Order'
import Dashboard from './Components/Dashboard/Dashboard'
import Users from './Components/Users/Users'
import Productdetails from './Components/Productdetails/Productdetails'
import AdminLogin from './Components/AdminLogin/AdminLogin'
import './App.css'
import ViewCards from './Components/ViewCards/ViewCards'
function App() {

  return (
    <div>
      <Routes>
        <Route path='/admin' Component={AdminLogin} />
        <Route path='/signup' Component={Signup} />
        <Route path='/' element={<Home />} />
        <Route path='/viewcard' element={<ViewCards/>}/>
        <Route path='/contact' Component={Contact} />
        <Route path='/feedback' Component={Feedback} />
        <Route path='/productdetails/:id' Component={Productdetails} />

        <Route Component={Auth}>
          <Route path='*' Component={Login} />
          <Route path='/forget' Component={ForgetPass} />
          <Route path='/otp' Component={Otp} />
          <Route path='/resetpass' Component={ResetPass} />
        </Route>

        <Route path='/dashboard' Component={Dashboard} >
          <Route path='' Component={Users} />
          <Route path='productlist' Component={ProductList} />
          <Route path='orderlist' Component={OrderList} />
          <Route path='productupload' Component={ProductUpload} />
          <Route path='feedbackdetails' Component={FeedbackDetails} />
          <Route path='contactdetails' Component={ContactDetails} />
          <Route path='order' Component={Order} />
        </Route>
      </Routes>
    </div >
  )
}

export default App
