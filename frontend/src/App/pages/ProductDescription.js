import {React, useState} from 'react'
import './Home.css';
import {Button, Container, FormControl, Form, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import * as ReactBootStrap from 'react-bootstrap'
import sole from "./sole.jpg"
import cart from "./cart.svg"
import test from "./test.jpeg"
import gucci from "./guccibelt.jpeg"

import { useEffect } from 'react';

function ProductDescription() {
  
const [searchname, setSearchName] = useState("");
const [Quantity, setQuantity] = useState(0);

  
  function increment(e){
    e.preventDefault();
    
    setQuantity((parseInt(Quantity)+1));

  }

  function decrement(e){
    e.preventDefault();
    
    setQuantity(Math.max(0,parseInt(Quantity)-1));

  }

  function handleClick(e){
    e.preventDefault();
    const userInput = {
      searchname: searchname
    }
    const header = {
      "Content-Type":"application/json"
    };

     axios.post('http://localhost:4000/product/search', userInput , {header} )
        .then(response => console.log(JSON.stringify(response.data)));

    console.log('searching done')
  }


let redirectLink = '';
  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('localsession')) {
      console.log("inside local storage");
      if (localStorage.getItem('localsession') !== '1') history.push('/');
    } else {
      const header = {
        'Content-Type': 'Application/json',
        'Access-Control-Allow-Credentials': true,
      };
      axios
        .get('http://localhost:4000/check', { header, withCredentials: true })
        .then((response) => {
          console.log(JSON.stringify(response.data.message));
          redirectLink = response.data.redirect;
        });

      if(redirectLink!=='')
        history.push(redirectLink)
    }
  }, []);
  
  return (
    <div >
      
      <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <ReactBootStrap.Navbar.Brand href="/home">
      <img 
        alt=""
        src={sole}
        width="30"
        height="30"
        margin-right="10px"
        className="s_image"
      />SoleFactory</ReactBootStrap.Navbar.Brand>
  <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
    <ReactBootStrap.Nav className="mr-auto">
      
      <ReactBootStrap.NavDropdown title="Categories" id="collasible-nav-dropdown">
        <ReactBootStrap.NavDropdown.Item href="#action/3.1">Food n Beverages</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item href="#action/3.2">Electronics</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item href="#action/3.3">Body Care</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item href="#action/3.4">Miscellaneous</ReactBootStrap.NavDropdown.Item>
      </ReactBootStrap.NavDropdown>
      
      <ReactBootStrap.Nav.Link href="#features">About Us</ReactBootStrap.Nav.Link>

    </ReactBootStrap.Nav>
    <ReactBootStrap.Nav>
        
      <Form inline div="search_bar">
      <FormControl
      type="text"
      placeholder="Search"
      className="mr-sm-2"
      value = {searchname}
      onChange={e=>setSearchName(e.target.value)} />
      <Button
      variant="outline-info"
      onClick={handleClick}>Search</Button>
    </Form>

      <ReactBootStrap.Nav.Link href="/orderhistory">Orders</ReactBootStrap.Nav.Link>
      <ReactBootStrap.Nav.Link eventKey={2} >
        Sign Out
      </ReactBootStrap.Nav.Link>
      <img 
      src={cart} 
      alt=""
      width="30"
        height="30" />

    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>

   <div className="back_home"> 
   <h1>Hello</h1>
   
   </div>

      <Container className="prod">
     
          <Row>
              <Col style={{padding: "0px"}}>
                <img 
                fluid 
                src={gucci} alt="" 
                width="400"
        height="450"/>
              </Col>
              <Col style={{padding: "0px"}}>
                <h1><strong>Gucci Belt</strong></h1>
                <p>By Gucci</p>
                <br/>
                <h5>About the Product</h5>
                <h6>Most luxurious belt</h6>
                <br/>

                <br/>

                <h2><span>&#8377; 31000</span></h2><br/>
                
                {/* <CounterInput onChange={ ( value ) => { console.log( value ) } }  /> */}
                <div >
                
                 
                 <Row inline>
                <Col xs={1}>
                <Button variant="dark" size="lg" onClick={increment}>
                    +
                 </Button>
                 </Col>
                 <Col xs={2}>
                  <Form.Control 
                  type="text" 
                  disabled
                  value={Quantity}
                  placeholder="0"
                //   value={firstName}
                //   onChange={e=>setFirstName(e.target.value)}
                  ></Form.Control>
                </Col>
                <Col xs={1}>
                  <Button variant="dark" size="lg" onClick={decrement}>
                    -
                 </Button>
                </Col>
              </Row>
                
                 
              
               
                 </div>
                
    
                <br/><br/>
               <div className="mb-2">
    
                <Button variant="secondary" size="lg">
                    Add to cart
                 </Button>
           </div>

              </Col>
            </Row>
            
      </Container>


    </div>
  )
}

export default ProductDescription;