import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
      e.preventDefault();
      const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
          };
      this.props.registerUser(newUser, this.props.history); 
  };

  render() {
    const { errors } = this.state;
    return (
      <Container className="mt-4">
        <Form noValidate onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <input
              className="form-control"
              type="text" 
              placeholder="Enter name" 
              onChange={this.onChange} 
              value={this.state.name}
              error={errors.name}
              id="name"
            />
            <span style={{color: "red"}}>{errors.name}</span>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <input
              className="form-control"
              type="text" 
              placeholder="Enter email" 
              onChange={this.onChange} 
              value={this.state.email}
              error={errors.email}
              id="email"
            />
            <span style={{color: "red"}}>{errors.email}</span>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
              id="password"
            />
            <span style={{color: "red"}}>{errors.password}</span>
          </Form.Group>

          <Form.Group>
            <Form.Label>Re-enter Password</Form.Label>
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
              id="password2"
            />
            <span style={{color: "red"}}>{errors.password2}</span>
          </Form.Group>
          

          <Row className="mt-3 mb-3">
            <Col>
              Already have an account? <Link to="/login">Log in</Link>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button variant="dark" className="float-left">
                <Link to="/" style={{color: "#fff"}}>
                  Back to home
                </Link>
              </Button>
            </Col>
            <Col>
              <Button variant="dark" type="submit" className="float-right">
                Register
              </Button>
            </Col>
          </Row>

        </Form>
      </Container>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));