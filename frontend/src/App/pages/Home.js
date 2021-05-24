import {React, useState} from 'react'
import './Home.css';
import {Button, Container, FormControl, Form, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useHistory } from 'react-router-dom';
import ProductList from "./productlist"
import coin from "./coin.png"
import axios from 'axios'
import * as ReactBootStrap from 'react-bootstrap'
import sole from "./sole.jpg"
import cart from "./cart.svg"

import { useEffect } from 'react';

function Home(props) {

const [ngo, setngo] = useState("false");
const [coins, setcoins] = useState(null);



  let history = useHistory();
  let initSearchName = ""
  let initCategory = "All"
  try{
    if(props.location.state.searchname!=undefined){
      initSearchName = props.location.state.searchname
    }
  }catch{}
  try{
    if(props.location.state.category!=undefined)
      initCategory = props.location.state.category
  }catch{}
  const [searchname, setSearchName] = useState(initSearchName);
  const [category, setCategory] = useState(initCategory);
  const [prodarray, setProdArray] = useState([]);
  
  useEffect(async() => {
    const userInput = {
      searchname: category,
      category: 1
    }
    const header = {
      "Content-Type":"application/json"
    };

    await axios.post('http://localhost:4000/product/search', userInput , {header} )
        .then(response => {
          console.log(response.data)
          setProdArray(response.data)});
    console.log('searching category done')
  },[category])

  useEffect(async () => {
    if(searchname==""){
      console.log("empty search")
      return
    }
    console.log(searchname)
    console.log("clicked")
    const userInput = {
      searchname: searchname
    }
    const header = {
      "Content-Type":"application/json"
    };

    await axios.post('http://localhost:4000/product/search',userInput, {header})
        .then(response => setProdArray(response.data) );

    console.log('searching search bar done')
  },[])
  
  let redirectLink = '';

  useEffect(() => {
    if (localStorage.getItem('localsession') === "1") {
      console.log("inside local storage");
      if (localStorage.getItem('localsession') !== '1') history.push('/');

      const header = {
        'Content-Type'                    : 'Application/json',
        'Access-Control-Allow-Credentials': true,
      };
      let x=localStorage.getItem('username');
      console.log(x);
      axios
        .get('http://localhost:4000/getuser', {params:{usrname: x}, header, withCredentials: true })
        .then((response) => {
          if(response.data.retuser){
          console.log(JSON.stringify(response.data.retuser));
          console.log(JSON.stringify(response.data.retuser.Type));
          console.log(JSON.stringify(response.data.retuser.CoinAmt));
          if(response.data.retuser && response.data.retuser.Type==="1"){
            setngo("true");
            console.log("hello");
            var y=response.data.retuser.CoinAmt;
            console.log(parseInt(y));
            setcoins(response.data.retuser.CoinAmt);
          }
          
          if(response.data.retuser &&response.data.retuser.IsActivated === "0"){
            history.push('/completeForm');
          }
        }
        }
    );

    } else {
      const header = {
        'Content-Type'                    : 'Application/json',
        'Access-Control-Allow-Credentials': true,
      };
      axios
        .get('http://localhost:4000/check', { header, withCredentials: true })
        .then((response) => {
          console.log(JSON.stringify(response.data.user));
          console.log(JSON.stringify(response.data.message));
          if(response.data.user.IsAuthorized === '0'){
            history.push('/completeForm');
          }
          redirectLink = response.data.redirect;
          if(response.data.message === "Unauthorized Access!"){
              history.push('/');

          }
        });

      if(redirectLink!=='')
        history.push(redirectLink)
    }
  }, []);
  
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

// console.log(ngo);
if(ngo==="false"){
   return (
    <div width="100%">
      
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
 
   
     {/* <div className="coin_display">
     
        <img src={coin} width="35" height="35" marginRight="20"  alt="" />
        
        {coins}</div> */}

        

      <ReactBootStrap.Nav.Link href = "/orderhistory">Orders</ReactBootStrap.Nav.Link>
      <ReactBootStrap.Nav.Link onClick={logoutClick}>Signout</ReactBootStrap.Nav.Link>

    
     
<button>
      <img 
      src    = {cart}
      alt    = ""
      width  = "30"
      height = "30" /></button>

    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>


   <div className = "back_home">
   <h1>Hello</h1>
   
   </div>
      <ProductList arr={prodarray} />
    </div>
  )

}else{
  return (
    <div width="100%">
      
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
 
   
     <div className="coin_display">
     
        <img src={coin} width="35" height="35" marginRight="20"  alt="" />
        
        {coins}</div>

        

      <ReactBootStrap.Nav.Link href = "/orderhistory">Orders</ReactBootStrap.Nav.Link>
      <ReactBootStrap.Nav.Link onClick={logoutClick}>Signout</ReactBootStrap.Nav.Link>

      <Link to= "/cart" style={{backgroundColor: "white"}}>
      <img 
      src    = {cart}
      alt    = ""
      width  = "30"
      height = "30" /></Link>

    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>


   <div className = "back_home">
   <h1>Hello</h1>
   
   </div>
      <ProductList arr={prodarray} />
    </div>
  )

    

}
}


export default Home;
