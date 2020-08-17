import React from "react";
import {connect} from "react-redux";

import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Button
} from "shards-react";
import { updateProfile, updatePassword } from "../../actionCreators";

class UserAccountDetails extends React.Component{
  state = {
    name:"",
    lastname:"",
    email:"",
    username:"",
    picture:"",
    password:"",
    confirm:""
  }


  componentDidMount( ){
      this.setState({
        name:this.props.user.name,
        lastname:this.props.user.lastname,
        email:this.props.user.email,
        username:this.props.user.username,
        picture:null,
        password:"",
        confirm:""
      })
  } 

  handleFileChange = (e) => this.setState({[e.target.name]:e.target.files[0]})
  handleChange = (e) => this.setState({[e.target.name]:e.target.value})

  handleProfileFormSubmit = (e) =>{
    e.preventDefault()
    this.props.updateProfile(this.props.user.id, this.state)
   
  }

  handlePasswordFormSubmit = (e) =>{
    e.preventDefault()
    const {password,confirm} = this.state
    if(password === confirm){
      this.props.updatePassword(this.props.user.id,password)
    }else{
      alert("Passwords did not match")
    }
  }

  render(){
    console.log(this.state);
    const {name,lastname,email,username,picture,password,confirm} = this.state
    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Account Details</h6>
        </CardHeader>
        <CardHeader className="border-bottom">
          <ListGroup flush>
            <ListGroupItem className="p-3">
              <Row>
                <Col>
                  <Form onSubmit={this.handleProfileFormSubmit}>
                    <Row form>
                      {/* First Name */}
                      <Col md="6" className="form-group">
                        <label htmlFor="name">First Name</label>
                        <FormInput
                          id="name"
                          name="name"
                          placeholder="First Name"
                          value={name}
                          onChange={this.handleChange}
                          required={true}
                        />
                      </Col>
                      {/* Last Name */}
                      <Col md="6" className="form-group">
                        <label htmlFor="lastname">Last Name</label>
                        <FormInput
                          id="lastname"
                          name="lastname"
                          placeholder="Last Name"
                          value={lastname}
                          onChange={this.handleChange}
                          required={true}
                        />
                      </Col>
                    </Row>
                    <Row form>
                      {/* Email */}
                      <Col md="6" className="form-group">
                        <label htmlFor="email">Email</label>
                        <FormInput
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email Address"
                          value={email}
                          onChange={this.handleChange}
                          required={true}
                        />
                      </Col>
                      {/* Password */}
                      <Col md="6" className="form-group">
                        <label htmlFor="username">Username</label>
                        <FormInput
                          type="text"
                          id="username"
                          name="username"
                          placeholder="username"
                          value={username}
                          onChange={this.handleChange}
                          required={true}
                        />
                      </Col>
                    </Row>
                    <Row form>
                      {/* Password */}
                      <Col md="6" className="form-group">
                        <label htmlFor="picture">Picture</label>
                        <FormInput
                          type="file"
                          id="picture"
                          name="picture"
                          
                          onChange={this.handleFileChange}
                        />
                      </Col>
                    </Row>
                    <Button theme="accent">Update Account</Button>
                  </Form>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
          </CardHeader>
          <ListGroup flush>
            <ListGroupItem className="p-3">
              <Row>
                <Col>
                  <Form onSubmit={this.handlePasswordFormSubmit}>
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
                          required={true}
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
                          required={true}
                        />
                      </Col>
                    </Row>
                    <Button theme="accent">Update Password</Button>
                  </Form>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
      </Card>
    );
  }
}




const msp = (state) => {
  return{
    user: state.user
  }
}

const mdp = (dispatch) => {
  return{
    updateProfile: (id,profileInfo) =>dispatch(updateProfile(id,profileInfo)),
    updatePassword: (id,password) => dispatch(updatePassword(id,password))
  }
}



export default connect(msp,mdp)(UserAccountDetails);
