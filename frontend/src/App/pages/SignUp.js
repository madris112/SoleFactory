import {React, useState} from 'react'
import './SignUp.css';
import {Button, Container, Form, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import axios from 'axios'

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

  function handleClick(e){
    e.preventDefault();
    const userInput = {
      username : userName,
      firstname : firstName,
      lastname: lastName,
      email: email,
      mobile: mobile,
      password: password,
      isngo: isNGO,
      gstno: gstno,
      ngoid: NGOId
    };
    console.log(userInput)
    const header = {
      "Content-Type":"application/json"
    };

     axios.post('http://localhost:4000/auth/signin', userInput , { header})
        .then(response => console.log(JSON.stringify(response.data.message)));

  }

  return (
    <div className="fixed-bg">
      <Container fluid>
        <Row className="justify-content-center" style={{paddingTop: "5%"}}>
          <Col xs={10} sm={7} md={3}  className="container-bg">
            {/* Login/SignUp choose */}
            <Row>
              <Col style={{padding: "0px"}}>
                <Link to={'./'}>
                  <Button className="full-button" style={{borderRadius: "10px 0px 0px 0px"}}>Login</Button>
                </Link>
              </Col>
              <Col style={{padding: "0px"}}>
                <Link to={'./'}>
                  <Button className="full-button" style={{borderRadius: "0px 10px 0px 0px"}}>SignUp</Button>
                </Link>
              </Col>
            </Row>

            {/* Form */}
            <Form>
              <Form.Group className="form-elem">
                <Form.Control 
                type="text" 
                placeholder="Username" 
                value={userName}
                onChange={e=>setUserName(e.target.value)}
                ></Form.Control>
              </Form.Group>
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
              <Form.Group className="form-elem">
                <Form.Control 
                type="email" 
                placeholder="Enter Email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="form-elem">
                <Form.Control 
                type="password" 
                placeholder="Enter Password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
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

export default SignUp;
