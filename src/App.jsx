import Login from './Components/Login/Login'
import { Route, Routes} from 'react-router-dom'
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
import ProductUpload from './Components/ProductUpload/ProductUpload'
import FeedbackDetails from './Components/FeedbackDetails/FeedbackDetails'
import Order from './Components/Order/Order'
import Dashboard from './Components/Dashboard/Dashboard'
import Users from './Components/Users/Users'
import AdminLogin from './Components/AdminLogin/AdminLogin'
import './App.css'
import ViewCard from './Components/ViewCards/ViewCards'
import AuthCheck from './Auth/Auth'
import PDF from './Components/Receipt/Receipt'
import PaymentButton from './Components/Productdetails/Productdetails'
import Address from './Components/Address/Address'
import { Cookies } from 'react-cookie';
import { useCookies } from 'react-cookie'

function App() {
  const[cookieId,setCookieId]=useCookies()
  const cookie =new Cookies()
  return (
    <div>

      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/admin' Component={AdminLogin} />
        <Route path='/signup' Component={Signup} />
        <Route path='viewcard' element={<ViewCard cookieId={cookie.get('cookieid')}  />} />
        <Route path='/contact' Component={Contact} />
        <Route path='/feedback' Component={Feedback} />
        <Route path='/productdetails/:id' element={<PaymentButton cookieId={cookie.get('cookieid')}/>} />
        <Route path='/receipt' Component={PDF} />
        <Route path='/address' Component={Address} />
        
        <Route Component={AuthCheck}>
          <Route path='/login' element={<Login setCookieId={setCookieId}/> } />
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
