import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Button } from 'react-bootstrap';

class Landing extends Component {
  render() {
    return (
      <Container fluid className="jumbotron d-flex align-items-center justify-content-center w-100">
        <Button variant="dark">
          <Link to="/register" style={{color: "#fff"}}>
            Register
          </Link>
        </Button>
        <div className="p-3"></div>
        <Button variant="dark">
          <Link to="/login" style={{color: "#fff"}}>
            Log In
          </Link>
        </Button>
      </Container>
    );
  }
}
export default Landing;