import React from "react"
import {Modal, ModalBody, ModalHeader,Row,Form,Col,FormInput, Button} from "shards-react"
import {connect} from 'react-redux'
import {saveCustomer} from "../actionCreators"

const initialState = {
  id:"",
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
    if(/^[0-9 -/]+$/.test(newValue) || newValue === ""){
     this.setState({[e.target.name]:newValue}) 
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.customer && !prevProps.customer ){
      this.setState({
        id: this.props.customer.id,
        firstName:this.props.customer.name,
        lastName:this.props.customer.lastname,
        phone:this.props.customer.phone
      })
    }
    // if (!this.props.customer && prevProps.customer ){
    //   this.setState({...initialState})
    // }
  } 

  handleSubmit =(e)=>{
    e.preventDefault()
    this.props.saveCustomer(this.state)
    this.props.showModalwithCustomer(false,null)
    this.setState({...initialState})
  }

  render(){
    const {showModal,showModalwithCustomer,customer}= this.props
    const {firstName,lastName,phone} = this.state
    console.log(this.props);
    return(
      <Modal open={showModal} toggle={()=>{showModalwithCustomer(false,null);this.setState({...initialState})}}>
        <ModalHeader>{customer?"Edit":"Add"} Customer</ModalHeader>
        <ModalBody>
            <Row>
              <Col>
                <Form onSubmit={this.handleSubmit}>
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
                    <Row form>
                      <Col align="right">
                        <Button 
                          className="mb-2 mr-1"
                          type="button" 
                          theme="secondary"
                          onClick={()=>{showModalwithCustomer(false,null);this.setState({...initialState})}} >
                            Close
                        </Button>
                        <Button className="mb-2 mr-1" theme="primary">
                            Save
                        </Button>
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

const mdp = dispatch => {
  return{
    saveCustomer: (customer) => dispatch(saveCustomer(customer))
  }
}


export default connect(null,mdp)(CustomerModal)
