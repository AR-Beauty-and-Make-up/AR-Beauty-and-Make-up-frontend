import { useState, useEffect } from "react";
import './App.css';
import HomePage from './components/home/HomePage'
import {Switch, Route} from 'react-router-dom'
import Scheduler from './components/scheduler/Scheduler'
import Navbar from './components/navbar/Navbar'
import Turn from './components/turn/Turn'
import Store from './components/store/Store'


import Profile from './components/profile/Profile'
import Login from './components/login/Login'
import SignUp from './components/login/SignUp'
import Checkout from './components/checkout/Checkout'
import Postpayment from './components/postpayment/Postpayment'
import Purchase from './components/purchase/Purchase'

import {UserProvider} from './providers/userProvider'
import {ProductProvider} from './providers/productProvider'
import {CartProvider} from './providers/cartProvider'


import {Helmet} from "react-helmet";

const App = () => {

  const [notification, setNotification] = useState(null)

  useEffect(() => {

    const timer = setTimeout(() => {
      setNotification(null)
    }, 6000);

    return () => clearTimeout(timer);
  }, [notification])

  return (

    <div className='App'>
      <Helmet>
        <style>{'html { background-color: #f4f1f1; }'}</style>
        <script src="https://sdk.mercadopago.com/js/v2"></script>
      </Helmet>
      <UserProvider>
      <CartProvider>
      <ProductProvider> 
        <Navbar />
        
        
        <Switch>
          <Route
            exact
            path="/"
            render={() => <HomePage />}>

          </Route>
          <Route
            exact
            path="/scheduler"
            render={() => <Scheduler setNotication={setNotification}/>}/>
          
          <Route
            exact
            path="/services"
            render={() => <Turn setNotication={setNotification}/>}/>

          <Route
            exact
            path="/store"
            render={() => <Store />}/> 


          <Route
            exact
            path="/profile/"
            render={() => <Profile />} />

          <Route
            exact
            path="/login/"
            render={() => <Login setNotication={setNotification} />} />
          
          <Route
            exact
            path="/sign-up/"
            render={() => <SignUp setNotication={setNotification} />} />

          <Route
            exact
            path="/check-out/"
            render={() => <Checkout />} />

          <Route
            exact
            path="/postpayment/"
            render={() => <Postpayment />} /> 
            
          <Route
            exact
            path="/purchases/"
            render={() => <Purchase />} />


        </Switch>
        {notification}
      </ProductProvider>
      </CartProvider>
        </UserProvider>
    </div>

  );
}

export default App;
