import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import {connect} from 'react-redux'
import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import {fetchCustomers} from '../actionCreators'


class Dashboard extends React.Component {
  componentDidMount(){
    this.props.fetchCustomers()
  }

  render() {
    console.log(this.props);
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Dashboard" className="text-sm-left mb-3" />
        </Row>
  
        {/* Small Stats Blocks */}
        <Row>
          {this.props.smallStats.map((stats, idx) => (
            <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
              <SmallStats
                id={`small-stats-${idx}`}
                variation="1"
                chartData={stats.datasets}
                chartLabels={stats.chartLabels}
                label={stats.label}
                value={stats.value}
                percentage={stats.percentage}
                increase={stats.increase}
                decrease={stats.decrease}
              />
            </Col>
          ))}
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
                    <tr>
                      <td>1</td>
                      <td>Ali</td>
                      <td>Kerry</td>
                      <td>Russian Federation</td>
                      <td>107-0339</td>
                      <td>
                        <Button outline className="mb-2 mr-1" theme="success">Pay</Button>
                        <Button outline className="mb-2 mr-1" theme="info">View</Button>
                        <Button outline className="mb-2 mr-1" theme="danger">Cancel</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Clark</td>
                      <td>Angela</td>
                      <td>Estonia</td>
                      <td>1-660-850-1647</td>
                      <td>
                        <Button outline className="mb-2 mr-1" theme="success">Pay</Button>
                        <Button outline className="mb-2 mr-1" theme="info">View</Button>
                        <Button outline className="mb-2 mr-1" theme="danger">Cancel</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Jerry</td>
                      <td>Nathan</td>
                      <td>Cyprus</td>
                      <td>214-4225</td>
                      <td>
                        <Button outline className="mb-2 mr-1" theme="success">Pay</Button>
                        <Button outline className="mb-2 mr-1" theme="info">View</Button>
                        <Button outline className="mb-2 mr-1" theme="danger">Cancel</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Colt</td>
                      <td>Angela</td>
                      <td>Liberia</td>
                      <td>1-848-473-7416</td>
                      <td>
                        <Button outline className="mb-2 mr-1" theme="success">Pay</Button>
                        <Button outline className="mb-2 mr-1" theme="info">View</Button>
                        <Button outline className="mb-2 mr-1" theme="danger">Cancel</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
};

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
    fetchCustomers: () => dispatch(fetchCustomers())
  }
}


export default connect(msp,mdp)(Dashboard);
