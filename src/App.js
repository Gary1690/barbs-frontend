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


function App() {
  return (
    <Router basename={process.env.REACT_APP_BASENAME || ""}>
      <Switch>
        <Route path="/" exact render={(props) =>(<Redirect to="/dashboard"/>)}/>
        <Route path="/auth" exact render={(props) =>(<Auth {...props}/>)}/>
        <Route path="/dashboard" exact render={(props) =>(<DefaultLayout ><Dashboard {...props}/></DefaultLayout>)}/>
        <Route path="/profile" exact render={(props) =>(<DefaultLayout ><UserProfile {...props}/></DefaultLayout>)}/>
        <Route path="/customers" exact render={(props) =>(<DefaultLayout ><Customer {...props}/></DefaultLayout>)}/>
        <Route path="/appointments" exact render={(props) =>(<DefaultLayout ><Appointment {...props}/></DefaultLayout>)}/>
        <Route path="/appointments/new/:id" exact render={(props) =>(<DefaultLayout ><Appointment {...props}/></DefaultLayout>)}/>
        <Route path="*" exact render={(props) =>(<Errors/>)}/>
      </Switch>
    </Router>
  )
}

export default App;
