import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import Header from '../app/components/header/Header';
import SideNav from '../app/components/sidenav/SideNav';
import CovidVariant from './components/Home/CovidVariant/CovidVariant';
import Dashboard from './components/Home/Dashboard/Dashboard'
import Facts from './components/Home/Facts/Facts';
import PatientDiagnosis from './components/Home/PatientDiagnosis/PatientDiagnosis';
import Statistics from './components/Home/Statistics/Statistics';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <div>
          <Header/>
          <SideNav/>
          <div className="app-container">
            <Route exact path={["/","/Dashboard"]} component={Dashboard}/>
            <Route exact path={"/Facts"} component={Facts}/>
            <Route exact path={"/Statistics"} component={Statistics}/>
            <Route exact path={"/Patient-Diagnosis"} component={PatientDiagnosis}/>
            <Route exact path={"/Variant/Delta"} component={CovidVariant}/>
            <Route exact path={"/Varitant/Mu"} component={CovidVariant}/>
          </div>
        </div>
      </Switch>
  </BrowserRouter>
  );
}

export default App;
