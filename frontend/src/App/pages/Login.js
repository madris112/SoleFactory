import {React, useState} from 'react'
import './Login.css';
import {Button, Container, Form, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import axios from 'axios'

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleClick(e){
    e.preventDefault();
    var userInput = {
      username: userName,
      password: password
    }

    const header = {
      "Content-Type":"application/json"
    };

    console.log(userInput);

     axios.post('http://localhost:4000/auth/signin', userInput , { header})
        .then(response => console.log(JSON.stringify(response.data.user)));
  }

  function googlesignin() {
    window.open('http://localhost:4000/auth/google','_self');
  }
  
  return (
    <div className = "fixed-bg">
      <Container fluid>
        <Row className = "justify-content-center" style = {{paddingTop: "10%"}}>
        <Col xs        = {10} sm                        = {7} md = {3}  className = "container-bg">
            {/* Login/SignUp choose */}
            <Row>
              <Col    style     = {{padding: "0px"}}>
              <Link   to        = {'./'}>
              <Button className = "full-button" style = {{borderRadius: "10px 0px 0px 0px"}}>Login</Button>
                </Link>
              </Col>
              <Col    style     = {{padding: "0px"}}>
              <Link   to        = {'./signup'}>
              <Button className = "full-button" style = {{borderRadius: "0px 10px 0px 0px"}}>SignUp</Button>
                </Link>
              </Col>
            </Row>

            {/* Form */}
            <Form>
              <Form.Group className = "form-elem">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                type        = "text"
                placeholder = "Username"
                value       = {userName}
                onChange    = {e=>setUserName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className = "form-elem">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type        = "password"
                placeholder = "Enter Password"
                value       = {password}
                onChange    = {e=>setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className = "form-elem">
                <Button 
                type      = "submit"
                className = "full-button"
                onClick   = {handleClick}
                >Login</Button>
              </Form.Group>
              <Form.Group className = "form-elem">
              <Button     className = "full-button" onClick = {googlesignin}>Google LogIn</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login;
