import React from "react";
import './App.css';
import HomePage from './components/home/HomePage'
import {Switch, Route} from 'react-router-dom'
import Scheduler from './components/scheduler/Scheduler'
import Navbar from './components/navbar/Navbar'
import Turn from './components/turn/Turn'
import Store from './components/store/Store'
import Profile from './components/profile/Profile'


function App() {
  return (

    <div className='App'>
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
          render={() => <Store />}/>

        <Route
          exact
          path="/profile/"
          render={() => <Profile />} />

      </Switch>
    </div>

  );
}

export default App;
