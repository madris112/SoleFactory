import {React, useState} from 'react'
import './Home.css';
import {Button, Container, FormControl, Form, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import * as ReactBootStrap from 'react-bootstrap'
import sole from "./sole.jpg"
import cart from "./cart.svg"

import { useEffect } from 'react';

function Home() {
  
const [searchname, setSearchName] = useState("");
const [category, setCategory] = useState("All");

  function handleClick(e){
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

  useEffect(() => {
    console.log(category)
    const userInput = {
      searchname: category,
      category: 1
    }
    const header = {
      "Content-Type":"application/json"
    };

     axios.post('http://localhost:4000/product/search', userInput , {header} )
        .then(response => console.log(JSON.stringify(response.data)));

    console.log('searching done')
  },[category])

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
      <ReactBootStrap.Nav.Link eventKey={2} href="#memes">
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

    </div>
  )
}

export default Home;
