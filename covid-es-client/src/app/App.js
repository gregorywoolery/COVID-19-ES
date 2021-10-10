import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home.component';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={["/", '/Statistics']} component={Home}/>
        {/* <Route exact path="" component={}/> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
