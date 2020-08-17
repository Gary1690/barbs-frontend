import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Switch, Redirect} from "react-router-dom";
import { DefaultLayout } from "./layouts";
import UserProfile from "./views/UserProfile";
import Customer from "./views/Customer";
import Errors from "./views/Errors";
import Appointment from "./views/Appointment";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import Dashboard from './views/Dashboard';
import Auth from './views/Auth';
import Payment from './views/Payment';
import {connect} from "react-redux"


function App( props) {
  const {user} = props
  return (
    <Router basename={process.env.REACT_APP_BASENAME || ""}>
      <Switch>
        <Route path="/" exact render={(props) =>(<Redirect to="/dashboard"/>)}/>
        <Route path="/auth" exact render={(props) =>(!user ? <Auth {...props}/> :<Redirect to="/dashboard"/>)}/>
        <Route path="/dashboard" exact render={(props) =>(user ? <DefaultLayout ><Dashboard {...props}/></DefaultLayout>:<Redirect to="/auth"/>)}/>
        <Route path="/profile" exact render={(props) =>(user ? <DefaultLayout ><UserProfile {...props}/></DefaultLayout>:<Redirect to="/auth"/>)}/>
        <Route path="/customers" exact render={(props) =>(user ? <DefaultLayout ><Customer {...props}/></DefaultLayout>:<Redirect to="/auth"/>)}/>
        <Route path="/appointments" exact render={(props) =>(user ? <DefaultLayout ><Appointment {...props}/></DefaultLayout>:<Redirect to="/auth"/>)}/>
        <Route path="/appointments/new/:id" exact render={(props) =>(user ? <DefaultLayout ><Appointment {...props}/></DefaultLayout>:<Redirect to="/auth"/>)}/>
        <Route path="/payment/:id" exact render={(props) =>(user ?<Payment {...props}/>:<Redirect to="/auth"/>)}/>
        <Route path="*" exact render={(props) =>(<Errors/>)}/>

      </Switch>
      
    </Router>
  )
}

const msp = state => {
  return {
    user:state.user
  }
}


export default connect(msp)(App);
