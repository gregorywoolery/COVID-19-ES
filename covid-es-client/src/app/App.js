import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import Header from '../app/components/header/Header';
import SideNav from '../app/components/sidenav/SideNav';
import Dashboard from './components/Home/Pages/Dashboard/Dashboard'
import Facts from './components/Home/Pages/Facts/Facts';
import PatientDiagnosis from './components/Home/Pages/PatientDiagnosis/PatientDiagnosis';
import Statistics from './components/Home/Pages/Statistics/Statistics';
import Modal from 'react-modal';
import NotFound404 from './components/Home/Pages/NotFound404/NotFound404';
import Patient from './components/Home/Pages/Patient/Patient';
import PatientList from './components/Home/Pages/PatientList/PatientList';

// Configures react-modal to #root for html
Modal.setAppElement('#root');

// Main app component that configures react router to use routes and display specific pages
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
            <Route exact path={"/Patient-Diagnosis/Patient/:patientid"} component={Patient}/>
            <Route exact path={"/Patients"} component={PatientList}/>
            <Route exact path={""} component={NotFound404}/>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
