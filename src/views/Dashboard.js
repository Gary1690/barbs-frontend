import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import {connect} from 'react-redux'
import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import {fetchCustomers,deleteAppointment,payAppointment} from '../actionCreators'


class Dashboard extends React.Component {
  componentDidMount(){
    this.props.fetchCustomers()
  }

  render() {
    const smallStats = this.props.smallStats
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Dashboard" className="text-sm-left mb-3" />
        </Row>
  
        {/* Small Stats Blocks */}
        <Row>
        
          <Col className="col-lg mb-4"  {...smallStats[0].attrs}>
            <SmallStats
              id={`small-stats-${1}`}
              variation="1"
              chartData={smallStats[0].datasets}
              chartLabels={smallStats[0].chartLabels}
              label={smallStats[0].label}
              value={this.todayAppointments().length}
              percentage={smallStats[0].percentage}
              increase={smallStats[0].increase}
              decrease={smallStats[0].decrease}
            />
          </Col>
          <Col className="col-lg mb-4"  {...smallStats[1].attrs}>
            <SmallStats
              id={`small-stats-${2}`}
              variation="1"
              chartData={smallStats[1].datasets}
              chartLabels={smallStats[1].chartLabels}
              label={smallStats[1].label}
              value={this.MonthAppointments(new Date().getMonth()).length}
              percentage={smallStats[1].percentage}
              increase={smallStats[1].increase}
              decrease={smallStats[1].decrease}
            />
          </Col>
          <Col className="col-lg mb-4"  {...smallStats[2].attrs}>
            <SmallStats
              id={`small-stats-${2}`}
              variation="1"
              chartData={smallStats[2].datasets}
              chartLabels={smallStats[2].chartLabels}
              label={smallStats[2].label}
              value={this.MonthAppointments(new Date().getMonth() -1 ).length}
              percentage={smallStats[2].percentage}
              increase={smallStats[2].increase}
              decrease={smallStats[2].decrease}
            />
          </Col>
        </Row>
        
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Today Appointments</h6>
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
                        Time
                      </th>
                      <th scope="col" className="border-0">
                        Phone
                      </th>
                      <th scope="col" className="border-0">
  
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.todayAppointments().length > 0 ? 
                    this.todayAppointments().map( (app,index)=>{
                      const customer =  this.props.customers.find(c=> c.id === app.customer_id)
                      return <RenderTableContent 
                              payAppointment={this.props.payAppointment} 
                              deleteAppointment={this.props.deleteAppointment} 
                              key={app.id} 
                              index ={index} 
                              {...app}
                              history={this.props.history} 
                              customer={customer}/>
                    })
                    : 
                    <tr> <td colSpan={5} style={{fontSize:"1.5em",textAlign:"center"}}>No Appointments today</td></tr>
                    }
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }

  todayAppointments = ()=>{
    const start = new Date()
    start.setHours(0)
    const end = new Date()
    end.setHours(23)
    return this.props.appointments.filter( app => {
      const date = new Date (app.start)
      if(start < date && end > date){
        return app
      }
    })
  }

  MonthAppointments = (month) => {
    return this.props.appointments.filter( app => {
      const date = new Date (app.start)
      if(month === date.getMonth()){
        return app
      }
    })
  }

};

const RenderTableContent = (props) => {
  const {index,id,customer,start,status} = props
  const date = new Date(start)
  return(
    <tr>
      <td>{index+1}</td>
      <td>{customer && customer.name}</td>
      <td>{customer && customer.lastname}</td>
      <td>{`${date.getHours()}:${date.getMinutes()?date.getMinutes():"00"}`}</td>
      <td>{customer && customer.phone}</td>
      <td align="right">
        <Button
          onClick ={()=>props.history.push(`/payment/${id}`)} 
          outline 
          disabled={!!status}
          className="mb-2 mr-1" 
          theme="success">Pay</Button>
        {/* <Button outline className="mb-2 mr-1" theme="info">View</Button> */}
        <Button 
          onClick={()=>props.deleteAppointment(props.id,null)} 
          outline 
          className="mb-2 mr-1" 
          disabled={!!status}
          theme="danger">Cancel</Button>
      </td>
    </tr>
  )
}

Dashboard.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};

Dashboard.defaultProps = {
  smallStats: [
    {
      label: "Today Appointments",
      value: "2,390",
      percentage: "4.7%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [1, 2, 1, 3, 5, 4, 7]
        }
      ]
    },
    {
      label: "This Month Appointments",
      value: "182",
      percentage: "12.4",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(23,198,113,0.1)",
          borderColor: "rgb(23,198,113)",
          data: [1, 2, 3, 3, 3, 4, 4]
        }
      ]
    },
    {
      label: "Last Month Appointments",
      value: "8,147",
      percentage: "3.8%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,180,0,0.1)",
          borderColor: "rgb(255,180,0)",
          data: [2, 3, 3, 3, 4, 3, 3]
        }
      ]
    }
  ]
};

const msp = (state) => {
  return {
    appointments : state.appointments,
    customers : state.customers
  }
}

const mdp = (dispatch) => {
  return{
    fetchCustomers: () => dispatch(fetchCustomers()),
    deleteAppointment: (id,event) => dispatch(deleteAppointment(id,event)),
    payAppointment:(id,eventApi) => dispatch(payAppointment(id,eventApi))
  }
}


export default connect(msp,mdp)(Dashboard);
