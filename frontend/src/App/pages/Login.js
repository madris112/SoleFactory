import {React, useState} from 'react'
import './Login.css';
import {Button, Container, Form, Col, Row, Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import GoogleButton from 'react-google-button'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import loginimage from './login.jpg'

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [resmsg, setResMsg] = useState(null);
  let   history                 = useHistory();
  let   redirectLink            = '';



  function handleClick(e) {
    
    
    e.preventDefault();
    var userInput = {
      username: userName,
      password: password,
    };

    console.log(userInput);
    const header = {
      'Content-Type': 'application/json',
    };
    axios
      .post('http://localhost:4000/auth/signin', userInput, { header })
      .then((response) => {
        console.log(JSON.stringify(response.data.message));
        setResMsg(response.data.message);
        redirectLink = response.data.redirect;
        console.log(redirectLink);
        if (response.data.successcode === '1')
          localStorage.setItem('localsession', '1');

        if(redirectLink==='')
      console.log(redirectLink);
    if (redirectLink !== '') history.push(redirectLink);  
      });

    
  }

  function googlesignin() {
    window.open('http://localhost:4000/auth/google','_self');
  }
  
  return (
    <div className = "fixed-bg">
      
      <Container fluid>
        <Row className = "justify-content-center" style = {{paddingTop: "5%"}}>
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
            <Row>
                  <Col>
                     <Image src = {loginimage} fluid/>
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
                <Container style={{textAlign:"center",marginTop:"20px"}}><h6 style={{color:"red"}}>{resmsg}</h6></Container>
                
              </Form.Group>
              <Form.Group className = "form-elem">
              <Container fluid>
              <Row>
                 <Col></Col>
                 <Col><GoogleButton onClick = {googlesignin}/></Col>
                 <Col></Col>
              </Row>
              
              
              </Container>
              
              
              
              
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login;
