import {React, useState, useEffect} from 'react'
import './Home.css';
import {Button, Container, FormControl, Form, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useHistory , useLocation } from 'react-router-dom';
import ProductList from "./productlist"
import Foot from "./footer"
import coin from "./coin.png"
import axios from 'axios'
import * as ReactBootStrap from 'react-bootstrap'
import sole from "./sole.jpg"
import cart from "./cart.svg"
import { FaCartPlus, FaCoins } from "react-icons/fa";
import Badges from "./badge.js"
function Home(props) {


//define various required states
  const [searchname, setSearchName] = useState(null);
  const [category, setCategory] = useState(null);
  const [prodarray, setProdArray] = useState([]);
  const [navselected, setNavSelected] = useState(null);
  const [ngo, setngo] = useState("false");
  const [coins, setcoins] = useState(null);
 


  let history = useHistory();
  let initSearchName = ""
  let initCategory = "All"

  const {search} = useLocation();
  const searchParams = new URLSearchParams(search);
  let FirstQuery = null;
  if(searchParams.get('searchname'))
    FirstQuery = searchParams.get('searchname');
  let SecondQuery = null
  let ThirdQuery = null
  if(searchParams.get('category'))
    SecondQuery = searchParams.get('category');






  try{
   
    if(props.location.state.searchname!=undefined){
      initSearchName = props.location.state.searchname
      FirstQuery= props.location.state.searchname


    }
  }catch{}
  try{
  
    if(props.location.state.category!=undefined){

      ThirdQuery = props.location.state.category
    }
  }catch{}


  useEffect(async() => {


    if(category!==null || ThirdQuery){
    let query = null;

    if(category!==null)
    query = "?searchname="+category+"&category=1";
    if(ThirdQuery!==null)
    query = "?searchname="+ThirdQuery+"&category=1";

    history.push(`/home${query}`)
    }

  },[category])


  useEffect(async () => {

    const userInput = {
      searchname: searchname
    }
    
    const header = {
      "Content-Type":"application/json"
    };

    await axios.get('http://localhost:4000/product/search', {params:{searchname:FirstQuery,category:SecondQuery},header})
        .then(response => setProdArray(response.data) );

    
  },[FirstQuery])

  let redirectLink = '';

  
  // check if a user is signed in or not using local storage
  useEffect(() => {
    if (localStorage.getItem('localsession') === "1") {
      
      //if no user is signed in redirect to the login page
      if (localStorage.getItem('localsession') !== '1') history.push('/');

      const header = {
        'Content-Type'                    : 'Application/json',
        'Access-Control-Allow-Credentials': true,
      };
      let x=localStorage.getItem('username');
      
      //checking if the logged in user is ngo or not
      axios
        .get('http://localhost:4000/getuser', {params:{usrname: x}, header, withCredentials: true })
        .then((response) => {
          if(response.data.retuser){
            localStorage.setItem("ngo","false");
            localStorage.setItem("coins","0");
          

      //if the user is NGO, set the state of ngo as "true"
          if(response.data.retuser && response.data.retuser.Type==="1"){
            setngo("true");
            localStorage.setItem("ngo","true");
           
            var y=response.data.retuser.CoinAmt;

      //storing the available coins of ngo in local storage as well as in state variable
            setcoins(response.data.retuser.CoinAmt);
            localStorage.setItem("coins",response.data.retuser.CoinAmt);
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
          if(!localStorage.getItem('localsession')){
            localStorage.setItem('localsession',"1");
            localStorage.setItem("ngo","false");
            localStorage.setItem("coins","0");
          }
          console.log(JSON.stringify(response.data.user));
          console.log(JSON.stringify(response.data.message));
          if(response.data.user && response.data.user.Type === "1"){
            localStorage.setItem("ngo","true");
            localStorage.setItem("coins",response.data.user.CoinAmt);
            setngo("true");
            setcoins(response.data.user.CoinAmt);
          }
          if(response.data.user && response.data.user.IsActivated === '0'){
            history.push('/completeForm');
          }
          if(response.data.user){
          localStorage.setItem('username',response.data.user.username);
        }
          let userCart = localStorage.getItem(response.data.user.username)
          if(userCart===null){
            localStorage.setItem(response.data.user.username,JSON.stringify({}));
            localStorage.setItem("curUser",response.data.user.username);
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


//on clicking the signout button, clearing the local storage
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
    let query = null;
    if(searchname!=null)
    query = "?searchname="+searchname;

    history.push(`/home${query}`)

  }


var nameofuser = localStorage.getItem('curUser');
if(!nameofuser)nameofuser="hi";

// check if user is ngo and display the UI according to NGO
if(ngo==="false"){

   return (


// navbar with it components
   <div width="100%" style={{overflowX: 'hidden',height:"100%"}}>

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
      title= "Categories"
      id="collasible-nav-dropdown"
      onSelect={(key) => setCategory(key)}>
        <ReactBootStrap.NavDropdown.Item eventKey="All">All</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Divider />
        <ReactBootStrap.NavDropdown.Item eventKey="Food and Beverages">Food n Beverages</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item eventKey="Electronics">Electronics</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item eventKey="Body Care">Body Care</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item eventKey="Miscellaneous">Miscellaneous</ReactBootStrap.NavDropdown.Item>
      </ReactBootStrap.NavDropdown>

      <ReactBootStrap.Nav.Link href = "http://localhost:3000/nearexpiry">Near Expiry Products</ReactBootStrap.Nav.Link>
      <ReactBootStrap.Nav.Link href = "/bestseller">BestSellers</ReactBootStrap.Nav.Link>

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

      <ReactBootStrap.Nav.Link href = "/orderhistory">Orders</ReactBootStrap.Nav.Link>
    
      <ReactBootStrap.NavDropdown
      title= {nameofuser}
      id="collasible-nav-dropdown"
      >
        <ReactBootStrap.NavDropdown.Item href="/profile">My Profile</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Divider />
        <ReactBootStrap.NavDropdown.Item onClick={logoutClick} eventKey="Signout">Signout</ReactBootStrap.NavDropdown.Item>
      </ReactBootStrap.NavDropdown>


     <ReactBootStrap.Nav.Link href="/cart"><Badges/></ReactBootStrap.Nav.Link>


    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>

  {/* display all the products in the home page */}

     <div style={{bottom:"0px",height:"100%",width:"100%",paddingTop:"10px"}}>
      <ProductList arr={prodarray} />

        <Foot/>
      </div>
    </div>
  )

}else{

  //displaying the UI for non-NGO user
  return (

    <div width="100%" style={{overflowX: 'hidden',height:"100%"}}>

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

      <ReactBootStrap.Nav.Link href = "http://localhost:3000/nearexpiry">Near Expiry Products</ReactBootStrap.Nav.Link>
      <ReactBootStrap.Nav.Link href = "/bestseller">BestSellers</ReactBootStrap.Nav.Link>
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

       <FaCoins style={{marginRight:"3px"}}/>

        {coins}</div>



      <ReactBootStrap.Nav.Link href = "/orderhistory">Orders</ReactBootStrap.Nav.Link>
      <ReactBootStrap.NavDropdown
      title={nameofuser}
      id="collasible-nav-dropdown"
      onSelect={(key) => setCategory(key)}>
        <ReactBootStrap.NavDropdown.Item href="/profile" >My Profile</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Divider />
        <ReactBootStrap.NavDropdown.Item onClick={logoutClick} eventKey="Signout">Signout</ReactBootStrap.NavDropdown.Item>
      </ReactBootStrap.NavDropdown>


      <ReactBootStrap.Nav.Link href="/cart"><Badges /></ReactBootStrap.Nav.Link>





    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>
      <div style={{bottom:"0px",height:"100%",width:"100%",paddingTop:"10px"}}>
      <ProductList arr={prodarray} />

        <Foot/>
      </div>
    </div>
  )
}
}


export default Home;
