import React from "react";
import {  Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Calendar from "../components/calendar/Calendar";

const Appoinment = (props) => (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Calendar" subtitle="" className="text-sm-left" />
    </Row>

    {/* Calender */}
    <Row>
      <Col>
        <Calendar {...props}/>
      </Col>
    </Row>
    </Container>
);

export default Appoinment;
