import React from "react";
import './App.css';
import HomePage from './components/home/HomePage'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Scheduler from './components/scheduler/Scheduler'
import NavbarAR from './components/navbar/Navbar'
import Turn from './components/turn/Turn'

function App() {
  return (

    <div className='App'>
      <NavbarAR />
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

      </Switch>
    </div>

  );
}

export default App;
