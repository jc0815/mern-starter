import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
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
    const userData = {
        email: this.state.email,
        password: this.state.password
    };
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  render() {
    const { errors } = this.state;
    return (
      <Container className="mt-4">
        <Form noValidate onSubmit={this.onSubmit}>

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
            <span style={{color: "red"}}>{errors.email}{errors.emailnotfound}</span>
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
            <span style={{color: "red"}}>{errors.password}{errors.passwordincorrect}</span>
          </Form.Group>

          <Row className="mt-3 mb-3">
            <Col>
              Don't have an account? <Link to="/register">Register</Link>
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
                Login
              </Button>
            </Col>
          </Row>

        </Form>
      </Container>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);