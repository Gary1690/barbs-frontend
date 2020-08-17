import React from 'react'
import {connect} from 'react-redux'
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Button } from 'shards-react'
import {payAppointment} from '../../actionCreators'

const PaymentSummary = (props)=> {
  const{SelectedServiceIds,services,confirmPayment,appointmentToBePaid,user,payAppointment} = props
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const startDate =  new Date(appointmentToBePaid.start)
  const endDate =  new Date(appointmentToBePaid.end)
  console.log(props);
  return (
    <div className="payment-sumary">
      <Card>
        <CardHeader>
            <Row >
              <Col>
                <h3 style={{textAlign:"center"}}>Review Information</h3>
              </Col>
            </Row>
        </CardHeader>
        <CardBody>
        <table className="table mb-0">
              <thead className="bg-light">
                <tr align="right">
                  <th scope="col" className="border-0">
                    #
                  </th>
                  <th scope="col" className="border-0">
                    Description
                  </th>
                  <th scope="col" className="border-0">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  SelectedServiceIds.length > 0 
                  && 
                  SelectedServiceIds.map((sId,index) =>{
                    const service = services.find(s=> s.id === sId)
                    return(
                      <RenderTableRow 
                        key={sId}
                        index={index}
                        {...service}/>
                    )
                  })
                }
                <tr><td colSpan={3} className="border-0"></td></tr>
                <tr align="right">
                  <td  className="border-0">
                  
                  </td>
                  <td  className="border-0">
                    Total
                  </td>
                  <td  className="border-0">
                    {
                      SelectedServiceIds.length > 0 
                      ?
                      SelectedServiceIds.map(sId=>{
                        return services.find(s=> s.id ===sId)
                      }).reduce((a,b)=> a+b.price,0)
                      :
                      0
                    }
                  </td>
                </tr>
              </tbody>
            </table>
        </CardBody>
        <CardFooter>
          <Row>
            <Col>
              <h6>Appointment</h6>
              <b className="increaseFont">{startDate.toLocaleDateString('en-US',options)}</b><br/>
              <b className="increaseFont">From {`${startDate.getHours()}:${startDate.getMinutes()> 0 ?startDate.getMinutes():"00"}`} to  {`${endDate.getHours()+1}:${endDate.getMinutes()>0?endDate.getMinutes():"00"}`} </b><br/>
              <b className="increaseFont">Barber: {`${user.name} ${user.lastname}`}</b>
            </Col>
            <Col>
              <h6>Customer</h6>
              <b className="increaseFont">{`${appointmentToBePaid.customer.name} ${appointmentToBePaid.customer.name}`}</b><br/>
              <b className="increaseFont">929-241-9994</b>
            </Col>
            <Col align="right">
                <Button onClick={()=>{confirmPayment()}} theme="danger" className="mr-1 mb-0">Cancel</Button>
                <Button onClick={()=>{payAppointment(appointmentToBePaid.id,SelectedServiceIds,)}} theme="success" className="mr-1 mb-0">Confirm & Pay</Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>        
    </div>
  )
}

const RenderTableRow =(props)=>{
  const {index,description,price} = props
  return (
    <tr align="right">
      <td >
        {index+1}
      </td>
      <td >
        {description}
      </td>
      <td >
        {price}
      </td>
    </tr>
  )
}


const msp = (state) => {
  return{
    services: state.services,
    user:state.user,
    appointmentToBePaid: state.appointmentToBePaid
  }
}

const mdp = (dispatch) => {
  return {
    payAppointment:(appointmentId,servicesId,history) => dispatch(payAppointment(appointmentId,servicesId,history)) 
  }
}

export default connect(msp,mdp)(PaymentSummary)
