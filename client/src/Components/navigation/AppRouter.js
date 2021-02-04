import React, {useState} from 'react';

//Components
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

import LandingPage from '../landing/LandingPage'
import AppBar from '../utils/AppBar'
import LoginForm from '../login/LoginForm';
import Dashboard from '../utils/Dashboard';
import Info from '../account/Info';
import NewReport from '../reports/NewReport';
import Report from '../reports/Report';
import Reports from '../reports/Reports';
import GlassQuoteForm from '../glassQuote/GlassQuoteForm';
//Libraries
import Cookies from 'js-cookie'
//Helpers
import history from '../../Helpers/history';

export default function AppRouter(){

    return (

        <>
        <Router history={history}>
            <Switch>
                <Route exact path="/">
                    <LandingPage/>
                </Route>
                <Route exact path="/application/dashboard">
                    <AppBar/>
                    {Cookies.get("auth") && Cookies.get("auth")=="1"?<Dashboard />:<Redirect to="/application"/>}
                </Route>
                <Route exact path="/application/user">
                    <AppBar/>
                    {Cookies.get("auth") && Cookies.get("auth")=="1"?<Info />:<Redirect to="/application"/>}
                </Route>
                <Route exact path="/application/reports/new">
                    <AppBar/>
                    {Cookies.get("auth") && Cookies.get("auth")=="1"?<NewReport />:<Redirect to="/application"/>}
                </Route>
                <Route exact path="/application/reports/:reportID">
                    <AppBar/>
                    {Cookies.get("auth") && Cookies.get("auth")=="1"?<Report />:<Redirect to="/application"/>}
                </Route>
                <Route exact path="/application/reports">
                    <AppBar/>
                    {Cookies.get("auth") && Cookies.get("auth")=="1"?<Reports />:<Redirect to="/application"/>}
                </Route>
                <Route exact path="/application/glassQuote">
                    <AppBar/>
                    {Cookies.get("auth") && Cookies.get("auth")=="1"?<GlassQuoteForm />:<Redirect to="/application"/>}
                </Route>
                <Route exact path="/application">
                    <AppBar/>
                    {Cookies.get("auth")==1?<Redirect to="/application/dashboard" />:<LoginForm/>}
                </Route>
           
            </Switch>
   
        </Router>
        </>
    )

}