import React from "react";
import {Form,FormInput,Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import CustomerModal from "./CustomerModal";
import {connect} from "react-redux"
import {fetchCustomers,deleteCustomer} from "../actionCreators"

const TableRow = (props) => {
  const {index,id,name,lastname,phone,showModalwithCustomer,deleteCustomer,history} = props
  console.log(props);
  return (
    <tr>
      <td>{index+1}</td>
      <td>{name}</td>
      <td>{lastname}</td>
      <td>{phone}</td>
      <td align="right">
        <Button onClick={()=>{history.push(`/appointments/new/${id}`)}} outline className="mb-2 mr-1" theme="success">Appoitment</Button>
        <Button onClick={()=>showModalwithCustomer(true,id)} outline className="mb-2 mr-1" theme="info">Edit</Button>
        <Button onClick={()=>deleteCustomer(id)} outline className="mb-2 mr-1" theme="danger">Delete</Button>
      </td>
    </tr>
  )
}



class Customer extends React.Component{
  
  state = {
    showModal:false,
    filter:"",
    customerId:null
  }

  showModalwithCustomer =(showModal,customerId)=>{
   this.setState(prevState=> ({...prevState,showModal,customerId}))
  }

  setFilter =(filter) =>{
    this.setState(prevState=>({...prevState,filter:filter}))
  }

  componentDidMount(){
    this.props.fetchCustomers()
  }

  filterCustomers = (customers)=>{
    const filter = this.state.filter.toLowerCase() 
    const customersToBeDisplay = customers.filter(customer => {
      const {name,lastname,phone} = customer
      if (name.toLowerCase().includes(filter) || lastname.toLowerCase().includes(filter) || phone.includes(filter)){
        return customer
      }
    })
    return customersToBeDisplay
  }

  render (){
    const customersToBeDisplay = this.filterCustomers(this.props.customers)
    const customerToBeEdited = customersToBeDisplay.find( x => x.id === this.state.customerId)
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Customers" subtitle="" className="text-sm-left" />
        </Row>
  
        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <Row>
                  <Col xs={10}>
                    <Form>
                    <Row>
                      <Col>
                        <FormInput value={this.state.filter} onChange={(e)=>this.setFilter(e.target.value)} placeholder="search by name or phone..." />
                      </Col>
                      <Col>
                        <Button type="button" onClick={()=> this.setFilter("")} theme="secondary">Clear</Button>
                      </Col>
                    </Row>
                    </Form>
                  </Col>
                  <Col align="right">
                    <Button onClick={()=>{this.showModalwithCustomer(true,null)}}><i className="material-icons">person_add</i> Add Customer</Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        First Name
                      </th>
                      <th scope="col" className="border-0">
                        Last Name
                      </th>
                      <th scope="col" className="border-0">
                        Phone
                      </th>
                      <th scope="col" className="border-0">
                        
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {customersToBeDisplay.map((customer,index) => (
                        <TableRow 
                        history = {this.props.history}
                        key={customer.id} 
                        index={index}
                        {...customer} 
                        deleteCustomer={this.props.deleteCustomer}
                        showModalwithCustomer={this.showModalwithCustomer}/>
                      )
                    )}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <CustomerModal showModal={this.state.showModal}  showModalwithCustomer={this.showModalwithCustomer} customer={customerToBeEdited}/>
        </Row>
      </Container>
    )
  }
};

const msp = state => {
  return {
    customers: state.customers
  }
}

const mdp =dispatch=>{
  return{
    fetchCustomers: () => dispatch(fetchCustomers()),
    deleteCustomer: (id) => dispatch(deleteCustomer(id))
  }
}
export default connect(msp,mdp)(Customer);
