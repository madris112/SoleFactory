import {React, useState, useEffect} from 'react'
import './Home.css';
import {Button, Container, FormControl, Form, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useHistory , useLocation } from 'react-router-dom';
import BestList from "./bestlist"
import Foot from "./footer"
import coin from "./coin.png"
import axios from 'axios'
import * as ReactBootStrap from 'react-bootstrap'
import sole from "./sole.jpg"
import cart from "./cart.svg"
import { FaCartPlus } from "react-icons/fa";

function Bestseller(props) {

  const [searchname, setSearchName] = useState(null);
  const [category, setCategory] = useState(null);
  const [prodarray, setProdArray] = useState([]);
  const [navselected, setNavSelected] = useState(null);
  const [ngo, setngo] = useState("false");
  const [coins, setcoins] = useState(null);
  // const [finalval, setfinalval] = useState("");

  // setfinalval("Hi "+ {nameofuser});

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
    // console.log(typeof(props.location.state.searchname));
    if(props.location.state.searchname!=undefined){
      initSearchName = props.location.state.searchname
      FirstQuery= props.location.state.searchname


    }
  }catch{}
  try{
    // console.log("ye wala " + props.location.state.category)
    if(props.location.state.category!=undefined){

      ThirdQuery = props.location.state.category
    }
  }catch{}


  useEffect(async() => {


    // console.log(category);

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

    // console.log(searchname)
    // console.log("clicked + FirstQuery")
    const userInput = {
      searchname: searchname
    }
    // console.log("searchinf first query" + FirstQuery);
    const header = {
      "Content-Type":"application/json"
    };

    await axios.get('http://localhost:4000/bestseller', {params:{searchname:FirstQuery,category:SecondQuery},header})
        .then(response => {
          console.log(response.data.bestsell)
          setProdArray(response.data.bestsell)} );

    // console.log('searching search bar done')
  },[FirstQuery])

  let redirectLink = '';

  useEffect(() => {
    if (localStorage.getItem('localsession') === "1") {
      // console.log("inside local storage");
      if (localStorage.getItem('localsession') !== '1') history.push('/');

      const header = {
        'Content-Type'                    : 'Application/json',
        'Access-Control-Allow-Credentials': true,
      };
      let x=localStorage.getItem('username');
      // console.log(x);
      axios
        .get('http://localhost:4000/getuser', {params:{usrname: x}, header, withCredentials: true })
        .then((response) => {
          if(response.data.retuser){
            localStorage.setItem("ngo","false");
            localStorage.setItem("coins","0");
          // console.log(JSON.stringify(response.data.retuser));
          // console.log(JSON.stringify(response.data.retuser.Type));
          // console.log(JSON.stringify(response.data.retuser.CoinAmt));
          if(response.data.retuser && response.data.retuser.Type==="1"){
            setngo("true");
            localStorage.setItem("ngo","true");
            // console.log("hello");
            var y=response.data.retuser.CoinAmt;
            // console.log(parseInt(y));
            setcoins(response.data.retuser.CoinAmt);
            localStorage.setItem("coins",response.data.retuser.CoinAmt);
          }
        }
        }
    );
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
    let query = null;
    if(searchname!=null)
    query = "?searchname="+searchname;

    history.push(`/home${query}`)

    //  axios.get('http://localhost:4000/product/search', {header} )
    //     .then(response => setProdArray(response.data) );

    // console.log('searching done')
  }
var nameofuser = localStorage.getItem('curUser');
if(!nameofuser)nameofuser="hi";
// console.log(ngo);
if(ngo==="false"){
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

      {/* <ReactBootStrap.Nav.Link href = "#features">About Us</ReactBootStrap.Nav.Link> */}

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
      {/* <ReactBootStrap.Nav.Link onClick={logoutClick}>Signout</ReactBootStrap.Nav.Link> */}
      <ReactBootStrap.NavDropdown
      title= {nameofuser}
      id="collasible-nav-dropdown"
      >
        <ReactBootStrap.NavDropdown.Item href="/profile">My Profile</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Divider />
        <ReactBootStrap.NavDropdown.Item onClick={logoutClick} eventKey="Signout">Signout</ReactBootStrap.NavDropdown.Item>
      </ReactBootStrap.NavDropdown>


     <ReactBootStrap.Nav.Link href="/cart"><FaCartPlus/></ReactBootStrap.Nav.Link>


    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>


     <div style={{bottom:"0px",height:"100%",width:"100%"}}>
      <BestList arr={prodarray} />

        <Foot/>
      </div>
    </div>
  )

}else{
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

      {/* <ReactBootStrap.Nav.Link href = "#features">About Us</ReactBootStrap.Nav.Link> */}

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
      <ReactBootStrap.NavDropdown
      title={nameofuser}
      id="collasible-nav-dropdown"
      onSelect={(key) => setCategory(key)}>
        <ReactBootStrap.NavDropdown.Item href="/profile" >My Profile</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Divider />
        <ReactBootStrap.NavDropdown.Item onClick={logoutClick} eventKey="Signout">Signout</ReactBootStrap.NavDropdown.Item>
      </ReactBootStrap.NavDropdown>


           <ReactBootStrap.Nav.Link href="/cart"><FaCartPlus/></ReactBootStrap.Nav.Link>





    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>
      <div style={{bottom:"0px",height:"100%",width:"100%"}}>
      <BestList arr={prodarray} />

        <Foot/>
      </div>
    </div>
  )
}
}


export default Bestseller;
