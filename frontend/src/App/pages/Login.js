import {React, useState} from 'react'
import './Login.css';
import {Button, Container, Form, Col, Row, Image, InputGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import GoogleButton from 'react-google-button'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import loginimage from './blackwave.png'
import { useEffect } from 'react';
import { FaUserAlt } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import mainimg from'./orgbike.png'


function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [resmsg, setResMsg] = useState(null);
  let   history                 = useHistory();
  let   redirectLink            = '';

   useEffect(() => {
    if (localStorage.getItem('localsession') === "1") {
      console.log("inside local storage");
      if (localStorage.getItem('localsession') === '1') history.push('/home');
    } else {
      const header = {
        'Content-Type'                    : 'Application/json',
        'Access-Control-Allow-Credentials': true,
      };
      axios
        .get('http://localhost:4000/check', { header, withCredentials: true })
        .then((response) => {
          console.log(JSON.stringify(response.data.message));
          redirectLink = response.data.redirect;
          if(response.data.message === "Authorized Access!"){
              history.push('/home');
          }

        });


      if(redirectLink!=='')
        history.push(redirectLink)
    }
  }, []);

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
        console.log(JSON.stringify(response.data.user));
        setResMsg(response.data.message);
        redirectLink = response.data.redirect;
        localStorage.setItem('username', response.data.user.username);

        console.log(redirectLink);
        if (response.data.successcode === '1'){
          localStorage.setItem('localsession', '1');
          console.log("lety see");
          console.log(response.data.user.username);

          let userCart = localStorage.getItem(response.data.user.username)
          if(userCart===null)
            localStorage.setItem(response.data.user.username,JSON.stringify({}));
          
          localStorage.setItem("curUser",response.data.user.username);
        }
        if(redirectLink==='')
          console.log(redirectLink);
        if (redirectLink !== '') history.push(redirectLink);  
      }); 
  }

  function googlesignin() {
    window.open('http://localhost:4000/auth/google','_self');
  }
  
  return (
    // <div className = "fixed-bg">
      
    //   <Container fluid>
    //     <Row className = "justify-content-center" style = {{paddingTop: "5%"}}>
    //     <Col xs        = {10} sm                        = {7} md = {3}  className = "container-bg">
    //         {/* Login/SignUp choose */}
    //         <Row>
    //           <Col    style     = {{padding: "0px"}}>
    //           <Link   to        = {'./'}>
    //           <Button className = "full-button" style = {{borderRadius: "10px 0px 0px 0px"}}>Login</Button>
    //             </Link>
    //           </Col>
    //           <Col    style     = {{padding: "0px"}}>
    //           <Link   to        = {'./signup'}>
    //           <Button className = "full-button" style = {{borderRadius: "0px 10px 0px 0px"}}>SignUp</Button>
    //             </Link>
    //           </Col>
    //         </Row>
    //         <Row>
    //               <Col>
    //                  <Image src = {loginimage} fluid/>
    //               </Col>
    //         </Row>
  
    //         {/* Form */}
    //         <Form>
    //           <Form.Group className = "form-elem">
    //             <Form.Label>Username</Form.Label>
    //             <Form.Control 
    //             type        = "text"
    //             placeholder = "Username"
    //             value       = {userName}
    //             onChange    = {e=>setUserName(e.target.value)}
    //             ></Form.Control>
    //           </Form.Group>
    //           <Form.Group className = "form-elem">
    //             <Form.Label>Password</Form.Label>
    //             <Form.Control 
    //             type        = "password"
    //             placeholder = "Enter Password"
    //             value       = {password}
    //             onChange    = {e=>setPassword(e.target.value)}
    //             ></Form.Control>
    //           </Form.Group>
    //           <Form.Group className = "form-elem">
    //             <Button 
    //             type      = "submit"
    //             className = "full-button"
    //             onClick   = {handleClick}
    //             >Login</Button>
    //             <Container style={{textAlign:"center",marginTop:"20px"}}><h6 style={{color:"red"}}>{resmsg}</h6></Container>
                
    //           </Form.Group>
    //           <Form.Group className = "form-elem">
    //           <Container fluid>
    //           <Row>
    //              <Col></Col>
    //              <Col><GoogleButton onClick = {googlesignin}/></Col>
    //              <Col></Col>
    //           </Row>
              
              
    //           </Container>
              
              
              
              
    //           </Form.Group>
    //         </Form>
    //       </Col>
    //     </Row>
    //   </Container>
    // </div>

    <div class="logindiv">
    <Container fluid id="overall-container">
      
        <Row fluid id="row">
          <Col>
          {/* <div class="top-div">
          <img src={mainimg} style={{height:"80%",width:"60%",margintop:"20%"}}/>
          </div> */}
            <div id="left-container">
            <div style={{fontSize:"5vw",color:"white",position:"relative"}} id="solefactory">SoleFactory</div>
            <br/>
            
            <h6 style={{color:"white"}}>One Stop Solution</h6>
            <Button id="lorem-button">SignUp</Button>
            
            </div>
      
          </Col>
          <Col>
        <Container fluid>
         <Row className = "justify-content-center" style = {{paddingTop: "5%"}}>
         <Col className= "justify-content-center">
             
             
             <p style={{fontSize:"3vw",marginLeft:"40%"}}>Signin</p>
  
             {/* Form */}
             <Form class="main-form">
               <Form.Group className = "form-elem">
                <InputGroup id="inputgrp">
                <FaUserAlt style={{marginLeft:"20px" ,marginTop:"8px"}}/>
                 <Form.Control 
                 id="username"
                type        = "text"
                placeholder = "Username"
                value       = {userName}
                onChange    = {e=>setUserName(e.target.value)}
                ></Form.Control>
                </InputGroup> 
              </Form.Group>
              <Form.Group className = "form-elem">
                <InputGroup id="inputgrp">
                <FaUserAlt style={{marginLeft:"20px" ,marginTop:"7px"}}/>
                <Form.Control 
                id="username"
                type        = "password"
                placeholder = "Enter Password"
                value       = {password}
                onChange    = {e=>setPassword(e.target.value)}
                ></Form.Control>
                </InputGroup>
              </Form.Group>
              <Form.Group className = "form-elem">
                <Button 
                id="button"
                type      = "submit"
                className = "full-button"
                onClick   = {handleClick}
                >Login</Button>
                <Container style={{textAlign:"center",marginTop:"20px"}}><h6 style={{color:"red"}}>{resmsg}</h6></Container>
                
              </Form.Group>
              <Form.Group className = "form-elem">
              <Container fluid>
              <Row>
                 
                 <Col >
                 <Button id="button"><FaGoogle/> Signin With Google</Button>
                 
                 </Col>
                 
              </Row>
              
              <img class="ani-bike" src={mainimg} style={{position: "absolute",height:"80px",right:-200,zIndex:"100"}}/>
              </Container>
              
              
              
              
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>

          
          </Col>
        </Row>
      
    </Container>
    
    </div>
  )
}

export default Login;
