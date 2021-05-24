import {React,useState} from 'react'
import Home from './Home'
import {Button,Card, Container, FormControl, Form, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useHistory } from 'react-router-dom';
import ProductList from "./productlist"
import "./OrderHistory.css"
import axios from 'axios'
import * as ReactBootStrap from 'react-bootstrap'
import sole from "./sole.jpg"
import cart from "./cart.svg"
import guccibelt from "./guccibelt.jpeg"

import { useEffect } from 'react';


function OrderHistory(props) {


    const [searchname, setSearchName] = useState("");
const [category, setCategory] = useState("All");
const [prodarray, setProdArray] = useState([]);
  
  function logoutClick(e){
    
    console.log("clicked");

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
    const userInput = {
      searchname: searchname
    }
    const header = {
      "Content-Type": "application/json"
    };

     axios.post('http://localhost:4000/product/search', userInput , {header} )
        .then(response => setProdArray(response.data) );

    console.log('searching done')
  }
  
  useEffect(() => {
    console.log("clicked")
    const userInput = {
      searchname: searchname
    }
    const header = {
      "Content-Type":"application/json"
    };

     axios.post('http://localhost:4000/product/search',userInput, {header})
        .then(response => setProdArray(response.data) );

    console.log('searching done')
  },[])
  
  useEffect(() => {
    const userInput = {
      searchname: category,
      category: 1
    }
    const header = {
      "Content-Type":"application/json"
    };

     axios.post('http://localhost:4000/product/search', userInput , {header} )
        .then(response => setProdArray(response.data));

    console.log('searching done')
  },[category])

let redirectLink = '';
let history      = useHistory();

  useEffect(() => {
    if (localStorage.getItem('localsession') === "1") {
      console.log("inside local storage");
      if (localStorage.getItem('localsession') !== '1') history.push('/');
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
          if(response.data.message === "Unauthorized Access!"){
              history.push('/');
          }
          
        });


      if(redirectLink!=='')
        history.push(redirectLink)
    }
  }, []);
    return (
        <div>
            <ReactBootStrap.Navbar       collapseOnSelect expand = "lg" bg = "dark" variant = "dark">
      <ReactBootStrap.Navbar.Brand href                    = "/home">
      <img 
        alt          = ""
        src          = {sole}
        width        = "30"
        height       = "30"
        margin-right = "10px"
        className    = "s_image"
      />SoleFactory</ReactBootStrap.Navbar.Brand>
  <ReactBootStrap.Navbar.Toggle   aria-controls = "responsive-navbar-nav" />
  <ReactBootStrap.Navbar.Collapse id            = "responsive-navbar-nav">
  <ReactBootStrap.Nav             className     = "mr-auto">
      
      <ReactBootStrap.NavDropdown 
      title="Categories" 
      id="collasible-nav-dropdown"
      onSelect={(key) => setCategory(key)}>
        <ReactBootStrap.NavDropdown.Item eventKey="All">All</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Divider />
        <ReactBootStrap.NavDropdown.Item eventKey="Food and Beverages">Food n Beverages</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item eventKey="Electronics">Electronics</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item eventKey="Body Care">Body Care</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item eventKey="Miscellaneous">Miscellaneous</ReactBootStrap.NavDropdown.Item>
      </ReactBootStrap.NavDropdown>
      
      <ReactBootStrap.Nav.Link href = "#features">About Us</ReactBootStrap.Nav.Link>

    </ReactBootStrap.Nav>
    <ReactBootStrap.Nav>
        
      <Form inline div = "search_bar">
      <FormControl
      type        = "text"
      placeholder = "Search"
      className   = "mr-sm-2"
      value       = {searchname}
      onChange    = {e=>setSearchName(e.target.value)} />
      <Button
      variant = "outline-info"
      onClick = {handleClick}>Search</Button>
    </Form>

      <ReactBootStrap.Nav>
      
      <Button variant = "outline-info" onClick = {logoutClick}>SignOut</Button>
      </ReactBootStrap.Nav>

      <button id="toggle" onClick={props.click}>
      <img 
      src    = {cart}
      alt    = ""
      width  = "30"
      height = "30" /></button>

    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>
  <div className="you_orders" >
 <h2 className="your_orders"><strong>Your Orders</strong></h2>
 </div>

 <div className="whole_page">
                      <Container >
     
          <Row className="row_orders">
              <Col style={{padding: "0px"}}>
                <img className="img_row"
                fluid 
                
                src={guccibelt} alt="" 
                width="150"
                height="120"/>
              </Col>
              <Col style={{padding: "5px"}}><br/>
                <h4><strong>Gucci Belt</strong></h4>
                <p>By Gucci </p>
                
                <h5>Quantity: 5</h5>
                
               
                 </Col>
                 
                 
                 <Col className="row_price">
                 
                 <h3><strong>
                 ₹ 1000</strong></h3><br/>
                 <button lg color="secondary">Buy it Again</button>
                 </Col>
                 </Row>
                 </Container>



                              <Container >
     
          <Row className="row_orders">
              <Col style={{padding: "0px"}}>
                <img className="img_row"
                fluid 
                
                src={guccibelt} alt="" 
                width="150"
                height="120"/>
              </Col>
              <Col style={{padding: "5px"}}><br/>
                <h4><strong>Gucci Belt</strong></h4>
                <p>By Gucci </p>
                
                <h5>Quantity: 5</h5>
                
               
                 </Col>
                 <Col className="row_price">
                 
                 <h3><strong>
                 ₹ 1000</strong></h3><br/>
                  <button lg color="secondary">Buy it Again</button>
                 </Col>
                 </Row>
                 </Container>



                 <Container >
     
          <Row className="row_orders">
              <Col style={{padding: "0px"}}>
                <img className="img_row"
                fluid 
                
                src={guccibelt} alt="" 
                width="150"
                height="120"/>
              </Col>
              <Col style={{padding: "5px"}}><br/>
                <h4><strong>Gucci Belt</strong></h4>
                <p>By Gucci </p>
                
                <h5>Quantity: 5</h5>
                
               
                 </Col>
                 <Col className="row_price">
                 
                 <h3><strong>
                 ₹ 1000</strong></h3><br/>
                  <button lg color="secondary">Buy it Again</button>
                 </Col>
                 </Row>
                 </Container>
                 </div>
                
</div>
        
    )
}

export default OrderHistory