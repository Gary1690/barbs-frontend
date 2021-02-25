import React from 'react'
import {Row,Col, Card, CardHeader,ListGroup, ListGroupItem,Form,FormInput,Button} from "shards-react";
import {login} from "../../actionCreators"
import {connect} from "react-redux"

const initialState = {
  username:"",
  password:""
}

class Login  extends React.Component{
  
  state = {...initialState}

  handleChange =(e)=> this.setState({[e.target.name]:e.target.value})

  handleSubmit = (e) =>{
    e.preventDefault()
    this.props.login(this.state,this.props.history)
    this.setState({...initialState})
  }

  render () {
    const {username,password} = this.state
    return (
      <Card>
         <CardHeader className="border-bottom">
          <h6 className="m-0">Login</h6>
        </CardHeader>
        <ListGroup flush>
            <ListGroupItem className="p-3">
              <Row>
                <Col>
                  <Form onSubmit={this.handleSubmit} >
                    <Row form>
                      <Col className="form-group">
                        <label htmlFor="username">Username</label>
                        <FormInput
                          type="text"
                          id="username"
                          name="username"
                          placeholder="username"
                          value={username}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Row>
                    <Row form>
                      <Col className="form-group">
                        <label htmlFor="password">Password</label>
                        <FormInput
                          type="password"
                          id="password"
                          name="password"
                          placeholder="password"
                          value={password}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Row>
                    <Row form> 
                      <Col align="right">
                        {/* <Button type="button" onClick={()=>this.props.showSignup(true)}  theme="secondary" className="mb-2 mr-1">&larr; Sign up</Button> */}
                        <Button type="button" onClick={()=>this.setState({...initialState})} theme="secondary" className="mb-2 mr-1">Clear</Button>
                        <Button type="submit" theme="accent" className="mb-2 mr-1">Login</Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
      </Card>
    )
  }
}

const mdp = (dispatch) => {
  return {
    login: (userInfo,history) => dispatch(login(userInfo,history))
  }  
}

export default connect(null,mdp)(Login);