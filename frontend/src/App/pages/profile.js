import './profile.css';
import userimg from "./user.png"
import {React,useState} from 'react'
import Home from './Home'
import {Button,Card, Container, FormControl, Form, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { FaCartPlus } from "react-icons/fa";
import ProductList from "./productlist"
import "./OrderHistory.css"
import axios from 'axios'
import * as ReactBootStrap from 'react-bootstrap'
import sole from "./sole.jpg"
import cart from "./cart.svg"
import guccibelt from "./guccibelt.jpeg"
import coin from "./coin.png"
import Badges from "./badge.js"
function Profile() {
  let history = useHistory();

  const [searchname, setSearchName] = useState("");
  const [category, setCategory] = useState("");
  const [orderHistory, setOrderHistory] = useState([])
  const [userdetails, setUserDetails] = useState({})
  const [ngo, setngo] = useState("false");
  const [coins, setcoins] = useState(null);

  var fn="hi";
  var ln="hi";
  if(userdetails.firstname){
    fn=userdetails.firstname.charAt(0).toUpperCase() + userdetails.firstname.slice(1);
  }
  if(userdetails.lastname){
    ln=userdetails.lastname.charAt(0).toUpperCase() + userdetails.lastname.slice(1);
  }

  useEffect(() => {
    if (localStorage.getItem('localsession') === "1") {
      console.log("inside local storage");
      if (localStorage.getItem('localsession') !== '1') history.push('/');

      const header = {
        'Content-Type'                    : 'Application/json',
        'Access-Control-Allow-Credentials': true,
      };
      let x=localStorage.getItem('curUser');
      let userdetails;
      console.log(x);
      axios
        .get('http://localhost:4000/getuser', {params:{usrname: x}, header, withCredentials: true })
        .then((response) => {
          setUserDetails(response.data.retuser)
          if(response.data.retuser){
          //setUserDetails = JSON.stringify(response.data.retuser);
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

          // if(response.data.retuser &&response.data.retuser.IsActivated === "0"){
          //   history.push('/completeForm');
          // }
        }
        }
    );

    } else {
      // const header = {
      //   'Content-Type'                    : 'Application/json',
      //   'Access-Control-Allow-Credentials': true,
      // };
      // axios
      //   .get('http://localhost:4000/check', { header, withCredentials: true })
      //   .then((response) => {
      //     console.log(JSON.stringify(response.data.user));
      //     console.log(JSON.stringify(response.data.message));
      //     if(response.data.user.IsAuthorized === '0'){
      //       history.push('/completeForm');
      //     }
      //     redirectLink = response.data.redirect;
      //     if(response.data.message === "Unauthorized Access!"){
      //         history.push('/');

      //     }
      //   });

      // if(redirectLink!=='')
      //   history.push(redirectLink)
    }
  }, [userdetails]);
  useEffect(() => {
      if(category!=""){
          let data = {"category":category}
          history.push({
          pathname: "/home",
          state: data
      })
      return;
      }
  },[category])

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
    if(searchname!=""){
      let data = {"searchname":searchname}
      history.push({
        pathname: "/home",
        state: data
      })
      return;
    }
  }

  useEffect(() => {
    axios.get("http://localhost:4000/gethistory",{params:{username:localStorage.getItem("curUser")}})
      .then(response => {
        setOrderHistory(response.data.History)
      })
  },[])

  let redirectLink = '';

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

  var nameofuser = localStorage.getItem('curUser');
  if(!nameofuser)nameofuser="hi";

  if(ngo==="false"){

  return (
    <div style={{overflowX: 'hidden'}}>

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
      <ReactBootStrap.Nav.Link href = "/orderhistory">Orders</ReactBootStrap.Nav.Link>
        <ReactBootStrap.NavDropdown
  title={nameofuser}
  id="collasible-nav-dropdown"
  >
    <ReactBootStrap.NavDropdown.Item href= "/profile">My Profile</ReactBootStrap.NavDropdown.Item>
    <ReactBootStrap.NavDropdown.Divider />
    <ReactBootStrap.NavDropdown.Item onClick={logoutClick} eventKey="Signout">Signout</ReactBootStrap.NavDropdown.Item>
  </ReactBootStrap.NavDropdown>
     <ReactBootStrap.Nav.Link href="/cart"><Badges/></ReactBootStrap.Nav.Link>

</ReactBootStrap.Nav>
</ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>
    <div class="page-content page-container" id="page-content">
      <div class="padding ">
          <div class="row container d-flex justify-content-center ">
              <div class="col-xl-10 col-md-12 bbb">
                  <div class="card user-card-full">
                      <div class="row m-l-0 m-r-0">
                          <div class="col-sm-4 bg-c-lite-green user-profile">
                              <div class="card-block text-center text-white">
                                  <div class="m-b-25 m-r-25"> <img src={userimg} class="img-radius" alt="User-Profile-Image" /> </div>
                                  <h6 class="f-w-600">{userdetails.username}</h6>
                                  <p>{fn} {ln}</p> <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                              </div>
                          </div>
                          <div class="col-sm-8">
                              <div class="card-block">
                                  <h6 class="m-b-20 p-b-5 b-b-default f-w-600">General Details</h6>
                                  <div class="row">
                                      <div class="col-sm-6">
                                          <p class="m-b-10 f-w-600">Email</p>
                                          <h6 class="text-muted f-w-400">{userdetails.email}</h6>
                                      </div>
                                      <div class="col-sm-6">
                                          <p class="m-b-10 f-w-600">Phone</p>
                                          <h6 class="text-muted f-w-400">{userdetails.mobile}</h6>
                                      </div>
                                  </div>
                                  <div class="row">
                                      <div class="col-sm-6">
                                          <p class="m-b-10 f-w-600">Address</p>
                                          <h6 class="text-muted f-w-400">Home address</h6>
                                      </div>

                                  </div>
                                  <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Other Details</h6>
                                  <div class="row">
                                      <div class="col-sm-6">
                                          <p class="m-b-10 f-w-600">{userdetails.Type == '1'? ("Ngo id") :("Gst NO.")}</p>
                                          <h6 class="text-muted f-w-400">{userdetails.Type == '1'? userdetails.ngoid : userdetails.gstno}</h6>
                                      </div>
                                      {
                                        userdetails.Type =='1' ? (
                                          <div class="col-sm-6">
                                              <p class="m-b-10 f-w-600">Coins available</p>
                                              <h6 class="text-muted f-w-400">{userdetails.CoinAmt}</h6>
                                          </div>
                                        ) : (
                                          null
                                        )

                                      }
                                  </div>
                                  <ul class="social-link list-unstyled m-t-40 m-b-10">
                                      <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i class="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                                      <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i class="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                                      <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i class="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
    </div>
  )
}else{
   return (
    <div style={{overflowX: 'hidden'}}>

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

        <img src={coin} width="35" height="35" marginRight="20"  alt="" />

        {coins}</div>

      <ReactBootStrap.Nav.Link href = "/orderhistory">Orders</ReactBootStrap.Nav.Link>
        <ReactBootStrap.NavDropdown
  title={nameofuser}
  id="collasible-nav-dropdown"
  >
    <ReactBootStrap.NavDropdown.Item href= "/profile">My Profile</ReactBootStrap.NavDropdown.Item>
    <ReactBootStrap.NavDropdown.Divider />
    <ReactBootStrap.NavDropdown.Item onClick={logoutClick} eventKey="Signout">Signout</ReactBootStrap.NavDropdown.Item>
  </ReactBootStrap.NavDropdown>
     <ReactBootStrap.Nav.Link href="/cart"><Badges/></ReactBootStrap.Nav.Link>

</ReactBootStrap.Nav>
</ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>
    <div class="page-content page-container" id="page-content">
      <div class="padding ">
          <div class="row container d-flex justify-content-center ">
              <div class="col-xl-10 col-md-12 bbb">
                  <div class="card user-card-full">
                      <div class="row m-l-0 m-r-0">
                          <div class="col-sm-4 bg-c-lite-green user-profile">
                              <div class="card-block text-center text-white">
                                  <div class="m-b-25 m-r-25"> <img src={userimg} class="img-radius" alt="User-Profile-Image" /> </div>
                                  <h6 class="f-w-600">{userdetails.username}</h6>
                                  <p>{fn} {ln}</p> <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                              </div>
                          </div>
                          <div class="col-sm-8">
                              <div class="card-block">
                                  <h6 class="m-b-20 p-b-5 b-b-default f-w-600">General Details</h6>
                                  <div class="row">
                                      <div class="col-sm-6">
                                          <p class="m-b-10 f-w-600">Email</p>
                                          <h6 class="text-muted f-w-400">{userdetails.email}</h6>
                                      </div>
                                      <div class="col-sm-6">
                                          <p class="m-b-10 f-w-600">Phone</p>
                                          <h6 class="text-muted f-w-400">{userdetails.mobile}</h6>
                                      </div>
                                  </div>
                                  <div class="row">
                                      <div class="col-sm-6">
                                          <p class="m-b-10 f-w-600">Address</p>
                                          <h6 class="text-muted f-w-400">Home address</h6>
                                      </div>

                                  </div>
                                  <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Other Details</h6>
                                  <div class="row">
                                      <div class="col-sm-6">
                                          <p class="m-b-10 f-w-600">{userdetails.Type == '1'? ("Ngo id") :("Gst NO.")}</p>
                                          <h6 class="text-muted f-w-400">{userdetails.Type == '1'? userdetails.ngoid : userdetails.gstno}</h6>
                                      </div>
                                      {
                                        userdetails.Type =='1' ? (
                                          <div class="col-sm-6">
                                              <p class="m-b-10 f-w-600">Coins available</p>
                                              <h6 class="text-muted f-w-400">{userdetails.CoinAmt}</h6>
                                          </div>
                                        ) : (
                                          null
                                        )

                                      }
                                  </div>
                                  <ul class="social-link list-unstyled m-t-40 m-b-10">
                                      <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i class="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                                      <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i class="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                                      <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i class="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
    </div>
  )

}
}


export default Profile;
