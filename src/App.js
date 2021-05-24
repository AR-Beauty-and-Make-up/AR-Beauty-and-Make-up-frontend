import React from "react";
import './App.css';
import HomePage from './components/home/HomePage'
import {Switch, Route} from 'react-router-dom'
import Scheduler from './components/scheduler/Scheduler'
import Navbar from './components/navbar/Navbar'
import Turn from './components/turn/Turn'
import Store from './components/store/Store'
import Drawer from '@material-ui/core/Drawer'
import useCart from './utils/useCart'
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Cart from './components/cart/CartShopping'
import Profile from './components/profile/Profile'

import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  cart: {
    position: "fixed",
    zIndex: 100,
    right: "20px",
    top: "70px",
  }
}))

function App() {

  const [{openCart, setOpenCart}, {products, removeProduct, addProduct}] = useCart()
  const classes = useStyle()
  return (

    <div className='App'>
      <Drawer anchor="right" open={openCart} onClose={() => setOpenCart(false)}>
        <Cart products={products} addProduct={addProduct} removeProduct={removeProduct} />
      </Drawer>
      <IconButton className={classes.cart} onClick={() => setOpenCart(true)}>
        <Badge badgeContent={products.length} color='error' onClick={()=>  console.log(products)}>
          <ShoppingCartIcon  fontSize='large'/>
        </Badge> 
      </IconButton>
      <Navbar />
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

      </Switch>
    </div>

  );
}

export default App;
