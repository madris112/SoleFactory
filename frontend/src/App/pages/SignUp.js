import {React, useState} from 'react'
import './Login.css';
import {Button, Container, Form, Col, Row, InputGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useHistory } from 'react-router-dom';
import { FaKey, FaUserAlt, FaPenNib, FaMobileAlt, FaMailBulk, FaIdCard } from "react-icons/fa";
import axios from 'axios'
import mainimg from'./wbgbike.png'

function SignUp() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNGO, setIsNGO] = useState(0);
  const [gstno, setGSTNo] = useState("0");
  const [NGOId, setNGOId] = useState("0");
  const [resmsg, setResMsg] = useState(null);


let redirectLink = '';
  let history = useHistory();

  function handleClick(e) {
    e.preventDefault();
    const userInput = {
      username: userName,
      firstname: firstName,
      lastname: lastName,
      email: email,
      mobile: mobile,
      password: password,
      isngo: isNGO,
      gstno: gstno,
      ngoid: NGOId,
    };
    console.log(userInput);
    const header = {
      'Content-Type': 'application/json',
    };
    axios
      .post('http://localhost:4000/auth/signin', userInput, { header })
      .then((response) => {
        setResMsg(response.data.message);
        console.log(JSON.stringify(response.data.message));
        console.log(response.data.user);
        localStorage.setItem('username', response.data.user.username);
        redirectLink = response.data.redirect;

        if (response.data.successcode === '1'){
          localStorage.setItem('localsession', '1');
          let userCart = localStorage.getItem(response.data.user.username)
          if(userCart===null)
            localStorage.setItem(response.data.user.username,JSON.stringify({}));
          
          localStorage.setItem("curUser",response.data.user.username);
        }
        if(redirectLink==='')
          console.log("ok called")
        if (redirectLink !== '') history.push(redirectLink);
      });

    
  }

  // function handleClick(e){
  //   e.preventDefault();
  //   const userInput = {
  //     username : userName,
  //     firstname : firstName,
  //     lastname: lastName,
  //     email: email,
  //     mobile: mobile,
  //     password: password,
  //     isngo: isNGO,
  //     gstno: gstno,
  //     ngoid: NGOId
  //   };
  //   console.log(userInput)
  //   const header = {
  //     "Content-Type":"application/json"
  //   };

  //    axios.post('http://localhost:4000/auth/signin', userInput , { header})
  //       .then(response => console.log(JSON.stringify(response.data.message)));

  // }

  // return (
  //   <div className="fixed-bg">
  //     <Container fluid>
  //       <Row className="justify-content-center" style={{paddingTop: "5%"}}>
  //         <Col xs={10} sm={7} md={3}  className="container-bg">
  //           {/* Login/SignUp choose */}
  //           <Row>
  //             <Col style={{padding: "0px"}}>
  //               <Link to={'./'}>
  //                 <Button className="full-button" style={{borderRadius: "10px 0px 0px 0px"}}>Login</Button>
  //               </Link>
  //             </Col>
  //             <Col style={{padding: "0px"}}>
  //               <Link to={'./signup'}>
  //                 <Button className="full-button" style={{borderRadius: "0px 10px 0px 0px"}}>SignUp</Button>
  //               </Link>
  //             </Col>
  //           </Row>

  //           {/* Form */}
  //           <Form>
  //             <Form.Group className="form-elem">
  //               <Form.Control 
  //               type="text" 
  //               placeholder="Username" 
  //               value={userName}
  //               onChange={e=>setUserName(e.target.value)}
  //               ></Form.Control>
  //             </Form.Group>
  //             <Row>
  //               <Col xs={6}>
  //                 <Form.Control 
  //                 type="text" 
  //                 placeholder="Firstname"
  //                 value={firstName}
  //                 onChange={e=>setFirstName(e.target.value)}
  //                 ></Form.Control>
  //               </Col>
  //               <Col xs={6}>
  //                 <Form.Control 
  //                 type="text" 
  //                 placeholder="Lastname"
  //                 value={lastName}
  //                 onChange={e=>setLastName(e.target.value)}
  //                 ></Form.Control>
  //               </Col>
  //             </Row>
  //             <Form.Group className="form-elem">
  //               <Form.Control 
  //               type="number" 
  //               placeholder="Mobile Number"
  //               value={mobile}
  //               onChange={e=>setMobile(e.target.value)}
  //               ></Form.Control>
  //             </Form.Group>
  //             <Form.Group className="form-elem">
  //               <Form.Control 
  //               type="email" 
  //               placeholder="Enter Email"
  //               value={email}
  //               onChange={e=>setEmail(e.target.value)}
  //               ></Form.Control>
  //             </Form.Group>
  //             <Form.Group className="form-elem">
  //               <Form.Control 
  //               type="password" 
  //               placeholder="Enter Password"
  //               value={password}
  //               onChange={e=>setPassword(e.target.value)}
  //               ></Form.Control>
  //             </Form.Group>
  //             <Row>
  //               <Col xs={6}>
  //                 <Form.Check 
  //                 type="radio"
  //                 label="Wholeseller"
  //                 checked={!isNGO}
  //                 onChange={e=>setIsNGO(0)}
  //                 />
  //               </Col>
  //               <Col xs={6}>
  //               <Form.Check 
  //                 type="radio"
  //                 label="NGO"
  //                 checked={isNGO}
  //                 onChange={e=>setIsNGO(1)}
  //                 />
  //               </Col>
  //             </Row>
  //             <Row>
  //               <Col xs={6}>
  //                 <Form.Control 
  //                 type="number" 
  //                 placeholder="GST Number"
  //                 value={gstno}
  //                 onChange={e=>setGSTNo(e.target.value)}
  //                 disabled={isNGO}
  //                 ></Form.Control>
  //               </Col>
  //               <Col xs={6}>
  //                 <Form.Control 
  //                 type="text" 
  //                 placeholder="NGO Id"
  //                 value={NGOId}
  //                 onChange={e=>setNGOId(e.target.value)}
  //                 disabled={!isNGO}
  //                 ></Form.Control>
  //               </Col>
  //             </Row>
  //             <Form.Group className="form-elem">
  //               <Button type="submit" className="full-button" onClick={handleClick}>SignUp</Button>
  //             </Form.Group>
  //           </Form>
  //         </Col>
  //       </Row>
  //     </Container>
  //   </div>
  // )
  return(
    <div class="logindiv">
    <img class="ani-bike" src={mainimg} style={{position: "absolute",height:"80px",opacity:"0",top:"55%",zIndex:"100"}}/>
    <Container sm={1} fluid id="overall-container">

        <Row fluid id="row">
          <Col>

            <div id="left-container">
            <div style={{fontSize:"5vw",color:"white",position:"relative"}} id="solefactory">SoleFactory</div>
            <br/>

            <h6 style={{color:"white"}}>One Stop Solution</h6>
            <Link   to        = {'/'}>
            <Button id="lorem-button" >Login</Button>
            </Link>

            </div>

          </Col>
          <Col>
        <Container fluid>
         <Row className = "justify-content-center" style = {{paddingTop: "5%"}}>
         <Col className= "justify-content-center">


             <p style={{fontSize:"3vw",marginLeft:"40%"}}>SignUp</p>

             {/* Form */}
             <Form class="main-form">
             <Form.Group className="form-elem">
                <InputGroup id="inputgrp">
                <FaUserAlt style={{marginLeft:"20px" ,marginTop:"8px"}}/>
                <Form.Control 
                id="username"
                type="text" 
                placeholder="Username" 
                value={userName}
                onChange={e=>setUserName(e.target.value)}
                ></Form.Control>
                </InputGroup>
              </Form.Group>
              <Row>
                <Col xs={6} >
                <InputGroup id="inputgrp-multi" style={{float: "right"}} >
                <FaPenNib style={{marginLeft:"20px" ,marginTop:"8px"}}/>
                  <Form.Control 
                  id="username"
                  type="text" 
                  placeholder="Firstname"
                  value={firstName}
                  onChange={e=>setFirstName(e.target.value)}
                  ></Form.Control>
                </InputGroup>
                </Col>
                <Col xs={6}>
                <InputGroup id="inputgrp-multi" style={{float: "left"}}>
                <FaPenNib style={{marginLeft:"20px" ,marginTop:"8px"}}/>
                  <Form.Control 
                  id="username"
                  type="text" 
                  placeholder="Lastname"
                  value={lastName}
                  onChange={e=>setLastName(e.target.value)}
                  ></Form.Control>
                </InputGroup>
                </Col>
              </Row>
              <Form.Group className="form-elem">
                <InputGroup id="inputgrp">
                <FaMobileAlt style={{marginLeft:"20px" ,marginTop:"8px"}}/>
                <Form.Control 
                id="username"
                type="number" 
                placeholder="Mobile Number"
                value={mobile}
                onChange={e=>setMobile(e.target.value)}
                ></Form.Control>
                </InputGroup>
              </Form.Group>
              <Form.Group className="form-elem">
                <InputGroup id="inputgrp">
                <FaMailBulk style={{marginLeft:"20px" ,marginTop:"8px"}}/>
                <Form.Control 
                id="username"
                type="email" 
                placeholder="Enter Email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                ></Form.Control>
                </InputGroup>
              </Form.Group>
              <Form.Group className="form-elem">
                <InputGroup id="inputgrp">
                <FaKey style={{marginLeft:"20px" ,marginTop:"8px"}}/>
                <Form.Control 
                id="username"
                type="password" 
                placeholder="Enter Password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                ></Form.Control>
                </InputGroup>
              </Form.Group>
              <Row>
                <Col xs={6}>
                <InputGroup id="inputgrp-rad" style={{float: "right"}}>
                  <Form.Check 
                  type="radio"
                  label="Wholeseller"
                  checked={!isNGO}
                  onChange={e=>setIsNGO(0)}
                  />
                </InputGroup>
                </Col>
                <Col xs={6}>
                <InputGroup id="inputgrp-rad" style={{float: "left"}}>
                <Form.Check 
                  type="radio"
                  label="NGO"
                  checked={isNGO}
                  onChange={e=>setIsNGO(1)}
                  />
                </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                <InputGroup id="inputgrp-multi" style={{float: "right"}}>
                <FaIdCard style={{marginLeft:"20px" ,marginTop:"8px"}}/>
                  <Form.Control 
                  id="username"
                  type="number" 
                  placeholder="GST Number"
                  value={gstno}
                  onChange={e=>setGSTNo(e.target.value)}
                  disabled={isNGO}
                  ></Form.Control>
                </InputGroup>
                </Col>
                <Col xs={6}>
                <InputGroup id="inputgrp-multi" style={{float: "left"}}>
                <FaIdCard style={{marginLeft:"20px" ,marginTop:"8px"}}/>
                  <Form.Control 
                  id="username"
                  type="text" 
                  placeholder="NGO Id"
                  value={NGOId}
                  onChange={e=>setNGOId(e.target.value)}
                  disabled={!isNGO}
                  ></Form.Control>
                </InputGroup>
                </Col>
              </Row>
              <Form.Group className = "form-elem">
                <Button
                id="button"
                type      = "submit"
                className = "full-button"
                onClick   = {handleClick}
                >SignUp</Button>
                <Container style={{textAlign:"center",marginTop:"20px"}}><h6 style={{color:"red"}}>{resmsg}</h6></Container>

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

export default SignUp;
