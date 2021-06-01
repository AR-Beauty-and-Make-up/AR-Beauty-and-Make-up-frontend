import { useState, useEffect } from "react";
import './App.css';
import HomePage from './components/home/HomePage'
import {Switch, Route} from 'react-router-dom'
import Scheduler from './components/scheduler/Scheduler'
import Navbar from './components/navbar/Navbar'
import Turn from './components/turn/Turn'
import Store from './components/store/Store'

import Cart from './components/cart/Cart'
import Profile from './components/profile/Profile'
import Login from './components/login/Login'
import SignUp from './components/login/SignUp'


import {UserProvider} from './providers/userProvider'
import {ProductProvider} from './providers/productProvider'


const App = () => {

  const [notification, setNotication] = useState(null)

  useEffect(() => {

    const timer = setTimeout(() => {
      setNotication(null)
    }, 2200);

    return () => clearTimeout(timer);
  }, [notification])

  return (

    <div className='App'>
      <UserProvider>
      <ProductProvider>
        <Navbar />
        <Cart />
        
        <Switch>
          <Route
            exact
            path="/"
            render={() => <HomePage />}>

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
            render={() => <Store />}/> 


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
      </ProductProvider>
      </UserProvider>
    </div>

  );
}

export default App;
