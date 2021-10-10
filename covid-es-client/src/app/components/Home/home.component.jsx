import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from '../header/Header';
import SideNav from '../sidenav/SideNav';
import Statistics from './Statistics/Statistics';

export default function Home() {
    return (
        <div >
            <Header/>
            <SideNav/>
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/"} component={Statistics}/>
                </Switch>
            </BrowserRouter>
        </div>
    
    )
}
