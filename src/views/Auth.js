import React,{useState} from 'react'
import {Row,Col} from "shards-react";
import Login from "../components/auth/Login"
import Signup from "../components/auth/Signup"
import Logo from "../barbs_v1.png"




const Auth = (props)=> {
  const [isSignup, setIsSignup ] = useState(false)

  return (
    <div>
      <Row>
        <Col sm={{ size: 4, order: 2, offset: 4 }}>
            <img src={Logo} alt="LOGO" className="login-logo" style={{width:"35em"}}/>
            <div style={{marginTop:"-15.5em"}}>
              {
                isSignup ?
                <Signup {...props} showSignup={setIsSignup}/> 
                :
                <Login {...props} showSignup={setIsSignup}/>
              }
            </div>
        </Col>
      </Row>
    </div>
  )
}

export default Auth