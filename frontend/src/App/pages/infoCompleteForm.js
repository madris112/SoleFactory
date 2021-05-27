import {React, useState} from 'react'
import './SignUp.css';
import {Button, Container, Form, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';

function InfoComplete() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNGO, setIsNGO] = useState(0);
  const [gstno, setGSTNo] = useState("0");
  const [NGOId, setNGOId] = useState("0");
  const [ngo, setngo] = useState("false");


let redirectLink = '';
  let history = useHistory();

  useEffect(() => {
    
      const header = {
        'Content-Type'                    : 'Application/json',
        'Access-Control-Allow-Credentials': true,
      };
      axios
        .get('http://localhost:4000/check', { header, withCredentials: true })
        .then((response) => {
          console.log(JSON.stringify(response.data.user));
          console.log(JSON.stringify(response.data.message));
          setUserName(response.data.user.username);
          setFirstName(response.data.user.firstname);
          setLastName(response.data.user.lastname);
        
        });

      if(redirectLink!=='')
        history.push(redirectLink)
    
  }, []);
  

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
    console.log("input" + userInput);
    axios
      .post('http://localhost:4000/update', userInput, { header })
      .then((response) => {
        console.log(JSON.stringify(response.data.message));
        console.log(response.data.user);
        redirectLink = response.data.redirect;

          if(redirectLink==='')
      console.log("ok called")
    if (redirectLink !== '') history.push(redirectLink);
      });

    
  }



  return (
    <div className="fixed-bg">
      <Container fluid>
        <Row className="justify-content-center" style={{paddingTop: "5%"}}>
          <Col xs={10} sm={7} md={3}  className="container-bg">


            {/* Form */}
            <Form>
            <br/>
              <Row>
                <Col xs={6}>
                  <Form.Control 
                  type="text" 
                  placeholder="Firstname"
                  value={firstName}
                  onChange={e=>setFirstName(e.target.value)}
                  ></Form.Control>
                </Col>
                <Col xs={6}>
                  <Form.Control 
                  type="text" 
                  placeholder="Lastname"
                  value={lastName}
                  onChange={e=>setLastName(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
              <Form.Group className="form-elem">
                <Form.Control 
                type="number" 
                placeholder="Mobile Number"
                value={mobile}
                onChange={e=>setMobile(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Row>
                <Col xs={6}>
                  <Form.Check 
                  type="radio"
                  label="Wholeseller"
                  checked={!isNGO}
                  onChange={e=>setIsNGO(0)}
                  />
                </Col>
                <Col xs={6}>
                <Form.Check 
                  type="radio"
                  label="NGO"
                  checked={isNGO}
                  onChange={e=>setIsNGO(1)}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <Form.Control 
                  type="number" 
                  placeholder="GST Number"
                  value={gstno}
                  onChange={e=>setGSTNo(e.target.value)}
                  disabled={isNGO}
                  ></Form.Control>
                </Col>
                <Col xs={6}>
                  <Form.Control 
                  type="text" 
                  placeholder="NGO Id"
                  value={NGOId}
                  onChange={e=>setNGOId(e.target.value)}
                  disabled={!isNGO}
                  ></Form.Control>
                </Col>
              </Row>
              <Form.Group className="form-elem">
                <Button type="submit" className="full-button" onClick={handleClick}>SignUp</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default InfoComplete;