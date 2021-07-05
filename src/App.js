import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import Header from './components/Header.js'
import Details from './components/Details.js'
import Footer from './components/Footer.js'
import { BrowserRouter as Router, Switch, Route, useHistory, withRouter } from "react-router-dom"
import Login from './components/Login.js'
import ViewJobs from './components/ViewJobs.js'
import Description from './components/Description.js'
import OtherCharges from './components/OtherCharges.js'
import Labor from './components/Labor.js'
import Print from './components/Print.js'
import { TextareaAutosize } from '@material-ui/core';
import { useStateValue } from './components/StateProvider.js'
import { db } from './firebase'

import ReactToPrint from "react-to-print";
import PrinterWrapper from './components/Print.js'
import ReactDOM from "react-dom";
import Pdf from "react-to-pdf";
import Tester from './components/Tester.js'
import Signiture from './components/Signiture.js'
import { jobData } from './components/Empty';
// import { useHistory } from 'react-router-dom'
import Main from './components/Main.js'
import MobileViewItems from './components/MobileViewItems.js'
import Dashboard from './components/Dashboard.js'
import PrinterFriendly from './components/PrinterFriendly.js'
import SampleLogIn from './components/SampleLogIn.js'

function App() {

  return (
    <Router>
    <div className="app">
      <Switch>

        <Route path="/login">
          <Login />
          
        </Route>

        <Route path="/jobs">
          <ViewJobs />
          
        </Route>

        <Route path="/sample">
          
          <SampleLogIn />
          
        </Route>

        <Route path="/dashboard">

          <Dashboard />
          
        </Route>

        {/* <Route path="/print">
          <Print />
        </Route> */}

        {/* <Route path="/pdf">
          <ToPdf />
        </Route> */}

        <Route path="/jobdetails">
          <Main/>
        
        </Route>
        
        <Route path="/mobileDetails">
          <MobileViewItems />
        
        </Route>

        <Route path="/print">
          <PrinterFriendly />
        
        </Route>

        <Route path="/">
          <Login />
          
        </Route>
      

      </Switch>
    </div>
    </Router>
  );
}

export default App;
