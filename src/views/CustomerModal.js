import React from "react"
import {Modal, ModalBody, ModalHeader,Row,Form,Col,FormInput} from "shards-react"

const initialState = {
  firstName:"",
  lastName:"",
  phone:""
}

class CustomerModal extends React.Component {
  state = {...initialState}

  handleChange =(e)=> {
    if(e.target.name !=="phone"){
      this.setState({[e.target.name]:e.target.value})
    }else{
      this.applyMask(e)
    }
  }

  applyMask = (e) =>{
    const currentValue = this.state[e.target.name]
    let newValue = e.target.value
    if (currentValue.length < newValue.length && (newValue.length === 3 || newValue.length ===7 )){
      newValue+="-"
    }
    if(/^[0-9 -/]+$/.test(newValue)){
     this.setState({[e.target.name]:newValue}) 
    }
  }

  render(){
    const {showModal,showModalwithCustomer,user}= this.props
    const {firstName,lastName,phone} = this.state
    console.log(this.state);
    return(
      <Modal open={showModal} toggle={()=>showModalwithCustomer(false,null)}>
        <ModalHeader>{user?"Edit":"Add"} Customer</ModalHeader>
        <ModalBody>
            <Row>
              <Col>
                <Form>
                <Row form>
                      <Col className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <FormInput
                          type="text"
                          id="firstName"
                          name="firstName"
                          placeholder="First Name"
                          value={firstName}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Row>
                    <Row form>
                      <Col className="form-group">
                        <label htmlFor="lastName">lastName</label>
                        <FormInput
                          type="text"
                          id="lastName"
                          name="lastName"
                          placeholder="lastName"
                          value={lastName}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Row>
                    <Row form>
                      <Col className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <FormInput
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="phone"
                          value={phone}
                          maxLength="12"
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Row>
                </Form>
              </Col>
            </Row>
        </ModalBody>
      </Modal>
    )
  }
}


export default CustomerModal
