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
import Badges from "./badge.js"
import coin from "./coin.png"
import { FaCartPlus } from "react-icons/fa";
import { useEffect } from 'react';
function Cart(props) {
  let history = useHistory();

  const [searchname, setSearchName] = useState("");
  const [category, setCategory] = useState("");
  const [orderHistory, setOrderHistory] = useState([])
  const [ngo, setngo] = useState("false");
  const [coins, setcoins] = useState(null);


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
          // console.log(JSON.stringify(response.data.retuser));
          // console.log(JSON.stringify(response.data.retuser.Type));
          // console.log(JSON.stringify(response.data.retuser.CoinAmt));
          if(response.data.retuser && response.data.retuser.Type==="1"){
            setngo("true");
            // console.log("hello");
            var y=response.data.retuser.CoinAmt;
            // console.log(parseInt(y));
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
  }, []);

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

    // console.log("clicked");

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
      // console.log("inside local storage");
      if (localStorage.getItem('localsession') !== '1') history.push('/');
    } else {
      const header = {
        'Content-Type'                    : 'Application/json',
        'Access-Control-Allow-Credentials': true,
      };
      axios
        .get('http://localhost:4000/check', { header, withCredentials: true })
        .then((response) => {
          // console.log(JSON.stringify(response.data.message));
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


       {/* <ReactBootStrap.Nav>

       <Button variant = "outline-info" onClick = {logoutClick}>SignOut</Button>
       </ReactBootStrap.Nav> */}

       <ReactBootStrap.Nav.Link href = "/orderhistory">Orders</ReactBootStrap.Nav.Link>

            <ReactBootStrap.NavDropdown
      title={nameofuser}
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
  <div className="you_orders" >
 <h2 className="your_orders"><strong>Your Orders</strong></h2>
 </div>

 <div className="whole_page">
    <Container >
  {
    orderHistory.map((data,key) => {
      {console.log(data)}
      if(data.history.Quantity==0)
        return;
      return(
        <Row className="row_orders">
          <Col style={{padding: "0px"}}>
            <img className="img_row"
            fluid
            src={'http://localhost:4000/upload/' + data.product.imgURL} alt=""
            width="150"
            height="120"/>
          </Col>
          <Col style={{padding: "5px"}}><br/>
            <h4><strong>{data.product.Title}</strong></h4>
            <p>By {data.product.brand} </p>
            <h5>Quantity: {data.history.Quantity}</h5>
          </Col>
          <Col className="row_price">
            <h3><strong>Your total for this item was: {data.history.price * data.history.Quantity}</strong></h3><br/>
            <button lg color="secondary">Buy it Again</button>
          </Col>
        </Row>
      )
    })
  }
    </Container>
  </div>
</div>

    )
    }else{
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

       {/* <ReactBootStrap.Nav>

       <Button variant = "outline-info" onClick = {logoutClick}>SignOut</Button>
       </ReactBootStrap.Nav> */}

           <div className="coin_display">

        <img src={coin} width="35" height="35" marginRight="20"  alt="" />

        {coins}</div>

        <ReactBootStrap.Nav.Link href = "/orderhistory">Orders</ReactBootStrap.Nav.Link>

            <ReactBootStrap.NavDropdown
      title={nameofuser}
      id="collasible-nav-dropdown"
      onSelect={(key) => setCategory(key)}>
        <ReactBootStrap.NavDropdown.Item href="/profile">My profile</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Divider />
        <ReactBootStrap.NavDropdown.Item onClick={logoutClick} eventKey="Signout">Signout</ReactBootStrap.NavDropdown.Item>
      </ReactBootStrap.NavDropdown>
                <ReactBootStrap.Nav.Link href="/cart"><Badges/></ReactBootStrap.Nav.Link>




    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>
  <div className="you_orders" >
 <h2 className="your_orders"><strong>Your Orders</strong></h2>
 </div>

 <div className="whole_page">
    <Container >
  {
    orderHistory.map((data,key) => {
      {console.log(data)}
      if(data.history.Quantity==0)
        return;
      return(
        <Row className="row_orders">
          <Col style={{padding: "0px"}}>
            <img className="img_row"
            fluid
            src={'http://localhost:4000/upload/' + data.product.imgURL} alt=""
            width="150"
            height="120"/>
          </Col>
          <Col style={{padding: "5px"}}><br/>
            <h4><strong>{data.product.Title}</strong></h4>
            <p>By {data.product.brand} </p>
            <h5>Quantity: {data.history.Quantity}</h5>
          </Col>
          <Col className="row_price">
            <h3><strong>Your total for this item was: {data.history.price * data.history.Quantity}</strong></h3><br/>
            <button lg color="secondary">Buy it Again</button>
          </Col>
        </Row>
      )
    })
  }
    </Container>
  </div>
</div>

    )
    }
}

export default Cart;
