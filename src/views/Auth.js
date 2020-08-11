import React,{useState} from 'react'
import {Row,Col} from "shards-react";
import Login from "../components/auth/Login"
import Signup from "../components/auth/Signup"





const Auth = (props)=> {
  const [isSignup, setIsSignup ] = useState(false)

  return (
    <div>
      <Row>
        <Col sm={{ size: 4, order: 2, offset: 4 }}>
          <div style={{marginTop:"10em"}}>
            {
              isSignup ?
              <Signup showSignup={setIsSignup}/> 
              :
              <Login showSignup={setIsSignup}/>
            }
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Auth