import React from "react"
import {Row,Col, Card, CardHeader,ListGroup, ListGroupItem,Form,FormInput,Button} from "shards-react";

const initialState = {
  firstName: "",
  lastName:"",
  picture:"",
  email:"",
  username:"",
  password:"",
  confirm:""
}

class Signup extends React.Component {
  state = {...initialState}

  handleChange =(e)=> this.setState({[e.target.name]:e.target.value})


  render(){
    const {firstName,lastName,picture,email,username,password,confirm} = this.state
    return(
        <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Sign Up</h6>
        </CardHeader>
          <ListGroup flush>
            <ListGroupItem className="p-3">
              <Row>
                <Col>
                  <Form>
                    <Row form>
                      {/* First Name */}
                      <Col md="6" className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <FormInput
                          id="firstName"
                          name="firstName"
                          placeholder="First Name"
                          value={firstName}
                          onChange={this.handleChange}
                        />
                      </Col>
                      {/* Last Name */}
                      <Col md="6" className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <FormInput
                          id="lastName"
                          name="lastName"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Row>
                    <Row form>
                      {/* Password */}
                      <Col className="form-group">
                        <label htmlFor="picture">Picture</label>
                        <FormInput
                          type="file"
                          id="picture"
                          name="picture"
                          value = {picture}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Row>
                    <Row form>
                      {/* Email */}
                      <Col className="form-group">
                        <label htmlFor="email">Email</label>
                        <FormInput
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email Address"
                          value={email}
                          onChange={this.handleChange}
                        />
                      </Col>
                      {/* Password */}
                    </Row>
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
                      {/* Password */}
                      <Col md="6" className="form-group">
                        <label htmlFor="password">Password</label>
                        <FormInput
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Password"
                          value={password}
                          onChange={this.handleChange}
                        />
                      </Col>
                      {/* Password */}
                      <Col md="6" className="form-group">
                        <label htmlFor="confirm">Confirm Password</label>
                        <FormInput
                          type="password"
                          id="confirm"
                          name="confirm"
                          placeholder="Confirm Password"
                          value={confirm}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Row>
                    <Row form>
                      <Button type="button" onClick={()=>this.props.showSignup(false)} theme="secondary" className="mb-2 mr-1">&larr; Login</Button>
                      <Button type="button" onClick={()=>this.setState({...initialState})} theme="secondary" className="mb-2 mr-1">Clear</Button>
                      <Button type="submit" theme="accent" className="mb-2 mr-1">Create Account</Button>
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

export default Signup;