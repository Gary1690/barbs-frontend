import React from 'react'
import {Row,Col, Card, CardHeader,ListGroup, ListGroupItem,Form,FormInput,Button} from "shards-react";

const initialState = {
  username:"",
  password:""
}

class Login  extends React.Component{
  
  state = {...initialState}

  handleChange =(e)=> this.setState({[e.target.name]:e.target.value})

  render () {
    const {username,password} = this.state
    console.log(this.state);
    return (
      <Card>
         <CardHeader className="border-bottom">
          <h6 className="m-0">Login</h6>
        </CardHeader>
        <ListGroup flush>
            <ListGroupItem className="p-3">
              <Row>
                <Col>
                  <Form>
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
                      <Button type="button"  onClick={()=>this.props.showSignup(true)}  theme="secondary" className="mb-2 mr-1">&larr; Sign up</Button>
                      <Button type="button" onClick={()=>this.setState({...initialState})} theme="secondary" className="mb-2 mr-1">Clear</Button>
                      <Button type="submit" theme="accent" className="mb-2 mr-1">Login</Button>
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

export default Login;