import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import { DefaultLayout } from "./layouts";
import UserProfile from "./views/UserProfile";
import Customer from "./views/Customer";
import Errors from "./views/Errors";
import Appointment from "./views/Appointment";


import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";


const Content = (props) => {
  return(
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
  )
}


function App() {
  return (
    <Router basename={process.env.REACT_APP_BASENAME || ""}>
      <Switch>
        <Route path="/" exact render={(props) =>(<DefaultLayout ><Content/></DefaultLayout>)}/>
        <Route path="/profile" exact render={(props) =>(<DefaultLayout ><UserProfile/></DefaultLayout>)}/>
        <Route path="/customers" exact render={(props) =>(<DefaultLayout ><Customer/></DefaultLayout>)}/>
        <Route path="/appointments" exact render={(props) =>(<DefaultLayout ><Appointment/></DefaultLayout>)}/>
        <Route path="*" exact render={(props) =>(<Errors/>)}/>
      </Switch>
    </Router>
  )
}

export default App;
