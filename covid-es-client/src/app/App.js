import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import Header from '../app/components/header/Header';
import SideNav from '../app/components/sidenav/SideNav';
import CovidVariant from './components/Home/Pages/CovidVariant/CovidVariant';
import Dashboard from './components/Home/Pages/Dashboard/Dashboard'
import Facts from './components/Home/Pages/Facts/Facts';
import PatientDiagnosis from './components/Home/Pages/PatientDiagnosis/PatientDiagnosis';
import Statistics from './components/Home/Pages/Statistics/Statistics';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header/>
        <SideNav/>
        <div className="app-container">
          <Switch>
            <Route exact path={["/","/Dashboard"]} component={Dashboard}/>
            <Route exact path={"/Facts"} component={Facts}/>
            <Route exact path={"/Statistics"} component={Statistics}/>
            <Route exact path={"/Patient-Diagnosis"} component={PatientDiagnosis}/>
            <Route exact path={"/Variant/Delta"} component={CovidVariant}/>
            <Route exact path={"/Varitant/Mu"} component={CovidVariant}/>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
