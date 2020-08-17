
import React, { useState} from 'react'
import {FormSelect,Row,Col,Card, CardHeader, CardBody, Button, Form} from 'shards-react'
import { connect } from 'react-redux';
import PageTitle from '../common/PageTitle'

const PaymentTable = (props)=> {
    const [selected,setSelected] = useState(props.services.length> 0?props.services[0].id :0)

    const handleChange= (e)=>{
      setSelected(parseInt(e.target.value))
    }

    const{confirmPayment,handleRemove,handleSubmit,services,SelectedServiceIds,history} = props
    return (
      <div style={{width:"70%", margin:"auto", marginTop:"5%"}}>
        <Row className="page-header py-4">
          <PageTitle sm="4" title="Payment" subtitle="" className="text-sm-left" />
        </Row>
        
        <Card style={{marginTop:"2em"}}>
          <CardHeader>
                <Form onSubmit={(e)=>handleSubmit(e,selected)}> 
                  <Row form>
                    <Col md={6}></Col>
                    <Col  md={5} align="right">
                      <FormSelect onChange={handleChange} value={selected}> 
                        <option></option>
                        {services&& services.map(s=><option key={s.id} value={s.id}>{s.description}</option>)}
                      </FormSelect>
                    </Col >
                    <Col  md={1}  align="right">
                      <Button className="mr-1">Add</Button>
                    </Col>
                  </Row>
                </Form>
          </CardHeader>
          <CardHeader>
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
                  <th scope="col" className="border-0">
                   
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
                      handleRemove={handleRemove}
                      {...service}/>
                  )
                })
                }
                <tr><td className="border-0"></td></tr>
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
                  <td className="border-0" align="right">
                  </td>
                </tr>
              </tbody>
            </table>
          </CardHeader>
          <CardBody>
            <Row>
              <Col align="right">
                <Button onClick={()=>history.push("/dashboard")} theme="secondary" className="mr-1" >Return to Dashboard</Button>
                <Button onClick={confirmPayment} theme="success" className="mr-1" >Pay</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    )
}





const RenderTableRow =(props)=>{
  const {index,id,description,price,handleRemove} = props
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
      <td>
        <Button theme="danger" onClick={()=>handleRemove(id)}>⨂</Button>
      </td>
    </tr>
  )
}
const msp = (state) => {
  return{
    services:state.services
  }
}

export default connect(msp)(PaymentTable)