import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import home from './components/Home/home.component';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={["/"]} component={home}/>
        {/* <Route exact path="" component={}/> */}
      </Switch>
  </BrowserRouter>
  );
}

export default App;
