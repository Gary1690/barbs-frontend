import React from "react";
import PropTypes from "prop-types";
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

const UserAccountDetails = ({ title }) => (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <CardHeader className="border-bottom">
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
                      value="Sierra"
                      onChange={() => {}}
                    />
                  </Col>
                  {/* Last Name */}
                  <Col md="6" className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <FormInput
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      value="Brooks"
                      onChange={() => {}}
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
                      value="sierra@example.com"
                      onChange={() => {}}
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
                      value="username"
                      onChange={() => {}}
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
                      onChange={() => {}}
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
              <Form>
              <Row form>
                  {/* Password */}
                  <Col md="6" className="form-group">
                    <label htmlFor="password">Password</label>
                    <FormInput
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value="EX@MPL#P@$$w0RD"
                      onChange={() => {}}
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
                      value="EX@MPL#P@$$w0RD"
                      onChange={() => {}}
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

UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Account Details"
};

export default UserAccountDetails;
