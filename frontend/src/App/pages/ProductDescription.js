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

function ProductDescription(props) {
  let initQuantity = 0;
  try{
    initQuantity = JSON.parse(localStorage.getItem(localStorage.getItem("curUser")))[props.location.state.prod_id].quantity;
  }catch{}
  
  const [searchname, setSearchName] = useState("");
  const [Quantity, setQuantity] = useState(initQuantity);

  var sc = 'http://localhost:4000/upload/' + String(props.location.state.img_url);
  function increment(e){
    setQuantity(Math.min(props.location.state.instock,parseInt(Quantity)+1));
  }

  function decrement(e){
    setQuantity(Math.max(0,parseInt(Quantity)-1));
  }

  function logoutClick(e){
    localStorage.clear();
    const header = {
      "Content-Type": "application/json"
    };
    axios.get("http://localhost:4000/logout",{header})
    .then(response => {console.log(JSON.stringify(response.data.message))
          if(response.data.message === "Logout Successful!")
            history.push('/');
    });
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

  function addToCart(){
    let cartItems = JSON.parse(localStorage.getItem(localStorage.getItem("curUser")))
    cartItems[props.location.state.prod_id] = {...props.location.state, quantity: Quantity}
    localStorage.setItem(localStorage.getItem("curUser"),JSON.stringify(cartItems));
    console.log(localStorage)
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
      <Button variant = "outline-info" onClick = {logoutClick}>SignOut</Button>
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
                src={sc}
                alt="" 
                width="400"
                height="450"/>
              </Col>
              <Col style={{padding: "0px"}}>
                <h1><strong>{props.location.state.title}</strong></h1>
                <p>By {props.location.state.brand}</p>
                <br/>
                <h5>About the Product</h5>
                <h6>{props.location.state.description}</h6>
                <br/>

                <br/>
                <h6 style={{marginBottom:"10px"}}><span>Quantity in stock: {props.location.state.instock}</span></h6>
                <h6 style={{marginBottom:"10px"}}><span>MRP per bundle: &#8377; {props.location.state.price}</span></h6>
                <h6 style={{marginBottom:"10px"}}><span>Our Price: {props.location.state.discount}</span></h6>
                <h6 style={{marginBottom:"10px"}}><span>Your Total for this item: &#8377; {Quantity*props.location.state.discount}</span></h6>
                
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
                  <Button variant="secondary" size="lg" onClick={addToCart}>Add to cart</Button>
                </div>
              </Col>
            </Row>
            
      </Container>


    </div>
  )
}

export default ProductDescription;
