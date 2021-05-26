import { useState, useEffect } from "react";
import './App.css';
import HomePage from './components/home/HomePage'
import {Switch, Route} from 'react-router-dom'
import Scheduler from './components/scheduler/Scheduler'
import Navbar from './components/navbar/Navbar'
import Turn from './components/turn/Turn'
import Store from './components/store/Store'

import useCart from './utils/useCart'
import Cart from './components/cart/Cart'
import Profile from './components/profile/Profile'
import Login from './components/login/Login'
import SignUp from './components/login/SignUp'


const App = () => {
  const [{openCart, setOpenCart}, {products, removeProduct, addProduct}] = useCart()

  const [notification, setNotication] = useState(null)

  useEffect(() => {

    const timer = setTimeout(() => {
      setNotication(null)
    }, 2200);

    return () => clearTimeout(timer);
  }, [notification])

  return (

    <div className='App'>
      <Navbar />
      <Cart products={products} addProduct={addProduct} removeProduct={removeProduct} />
      <Switch>
        <Route
          exact
          path="/"
          render={props => <HomePage {...props}/>}>

        </Route>
        <Route
          exact
          path="/scheduler"
          render={() => <Scheduler/>}/>
        
        <Route
          exact
          path="/services"
          render={() => <Turn />}/>

        <Route
          exact
          path="/store"
          render={() => <Store  addProduct={addProduct} removeProduct={removeProduct} />}/> 


        <Route
          exact
          path="/profile/"
          render={() => <Profile />} />

        <Route
          exact
          path="/login/"
          render={() => <Login setNotication={setNotication} />} />
        
        <Route
          exact
          path="/sign-up/"
          render={() => <SignUp setNotication={setNotication} />} />

      </Switch>
      {notification}
    </div>

  );
}

export default App;
