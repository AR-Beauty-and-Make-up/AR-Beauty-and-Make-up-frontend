import React from "react";
import './App.css';
import HomePage from './components/home/HomePage'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Scheduler from './components/scheduler/Scheduler'

function App() {
  return (

    <BrowserRouter>

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

      </Switch>
    </BrowserRouter>


  );
}

export default App;
