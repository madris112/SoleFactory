import {React, useState, useEffect} from 'react'
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
import { FaCartPlus, FaCoins } from "react-icons/fa";
import coin from "./coin.png"
import Hrating from "./rating.js"
import Badges from "./badge.js"
function ProductDescription(props) {
  let history = useHistory();
  let initQuantity = 0;
  try{
    initQuantity = JSON.parse(localStorage.getItem(localStorage.getItem("curUser")))[props.location.state.prod_id].quantity;
  }catch{}

  const [Quantity, setQuantity] = useState(initQuantity);
  const [searchname, setSearchName] = useState("");
  const [category, setCategory] = useState("");
  const [msg, setmsg] = useState("");
  const [coins, setcoins] = useState(null);
  const [ngo, setngo] = useState("false");


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
        }
        }
    );

    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('localsession')) {
      // console.log("inside local storage");
      if (localStorage.getItem('localsession') !== '1') history.push('/');
    } else {
      const header = {
        'Content-Type': 'Application/json',
        'Access-Control-Allow-Credentials': true,
      };
      axios
        .get('http://localhost:4000/check', { header, withCredentials: true })
        .then((response) => {
          // console.log(JSON.stringify(response.data.message));
          redirectLink = response.data.redirect;
        });

      if(redirectLink!=='')
        history.push(redirectLink)
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
    if(searchname!=""){
    let data = {"searchname":searchname}

    let query = null;
    if(searchname!="")
    query = "?searchname="+searchname;

    // console.log("cart" + data);

    history.push({
        pathname: "/home",
        state: data
      })


  }
  }

  function addToCart(){
    let cartItems = JSON.parse(localStorage.getItem(localStorage.getItem("curUser")))
    if(cartItems!=null)
      cartItems[props.location.state.prod_id] = {...props.location.state, quantity: Quantity, nearexpiry: (props.location.state.nearexpiry?1:0)}

    localStorage.setItem(localStorage.getItem("curUser"),JSON.stringify(cartItems));
    // console.log(localStorage);
    setmsg("Item successfully added to cart")
  }
  var nameofuser = localStorage.getItem('curUser');
  if(!nameofuser)nameofuser="hi"
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
        onSelect={(key) => setCategory(key)}>
          <ReactBootStrap.NavDropdown.Item eventKey="All">My Profile</ReactBootStrap.NavDropdown.Item>
          <ReactBootStrap.NavDropdown.Divider />
          <ReactBootStrap.NavDropdown.Item onClick={logoutClick} eventKey="Signout">Signout</ReactBootStrap.NavDropdown.Item>
        </ReactBootStrap.NavDropdown>
      <ReactBootStrap.Nav.Link href="/cart"><Badges/></ReactBootStrap.Nav.Link>

    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>



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
                <p style={{fontSize:"20px"}}>By {props.location.state.brand}</p>
                <br/>
                <h5>About the Product</h5>
                <h6>{props.location.state.description}</h6>
                <br/>

                <br/>
                <h6 style={{marginBottom:"10px"}}><span>Quantity in stock: {props.location.state.instock}</span></h6>
                <h6 style={{marginBottom:"10px"}}><span>Price per unit: &#8377; {props.location.state.price}</span></h6>
                {props.location.state.nearexpiry ?
                  <h6 style={{marginBottom:"10px"}}><span>Our Price: {props.location.state.discount}</span></h6>
                : null }
                <h6 style={{marginBottom:"10px"}}><span>Your Total for this item: <span style={{fontSize:"18px",color:"green"}}> &#8377;{Quantity*(props.location.state.nearexpiry?props.location.state.discount:props.location.state.price)}</span></span></h6>

                {/* <CounterInput onChange={ ( value ) => { console.log( value ) } }  /> */}
                <div >


                 <Row inline>
                <Col xs={1}>
                <Button variant="dark" size="lg" onClick={decrement}>
                    -
                 </Button>

                 </Col>
                 <Col xs={2}>
                  <Form.Control
                  type="text"
                  value={Quantity}
                  placeholder="0"
                  onChange={e=>setQuantity(e.target.value)}
                  ></Form.Control>
                </Col>
                <Col xs={1}>
                <Button variant="dark" size="lg" onClick={increment}>
                    +
                 </Button>

                </Col>
              </Row>
                 </div>
                <br/><br/>
                <div className="mb-2">
                  <Hrating {...props} />
                </div>
                <div className="mb-2">
                  <Button style={{backgroundColor:"blue"}} size="lg" onClick={addToCart}><FaCartPlus style={{marginRight:"10px"}}/>Add to cart</Button>
                </div>
                <h6 style={{color:"green"}}>{msg}</h6>
              </Col>
            </Row>

      </Container>


    </div>
  )
}else{

   return (
    <div >

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
          <ReactBootStrap.NavDropdown.Item href="/profile">My Profile</ReactBootStrap.NavDropdown.Item>
          <ReactBootStrap.NavDropdown.Divider />
          <ReactBootStrap.NavDropdown.Item onClick={logoutClick} eventKey="Signout">Signout</ReactBootStrap.NavDropdown.Item>
        </ReactBootStrap.NavDropdown>
      <ReactBootStrap.Nav.Link href="/cart"><Badges/></ReactBootStrap.Nav.Link>
    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>
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
                <p style={{fontSize:"20px"}}>By {props.location.state.brand}</p>
                <br/>
                <h5>About the Product</h5>
                <h6>{props.location.state.description}</h6>
                <br/>
                <br/>
                <h6 style={{marginBottom:"10px"}}><span>Quantity in stock: {props.location.state.instock}</span></h6>
                <h6 style={{marginBottom:"10px"}}><span>Price per unit: &#8377; {props.location.state.price}</span></h6>
                {props.location.state.nearexpiry ?
                  <h6 style={{marginBottom:"10px"}}><span>Our Price: {props.location.state.discount}</span></h6>
                : null }
                <h6 style={{marginBottom:"10px"}}><span>Your Total for this item:<span style={{fontSize:"16px"}}> &#8377; {Quantity*(props.location.state.nearexpiry?props.location.state.discount:props.location.state.price)}</span></span></h6>
                {/* <CounterInput onChange={ ( value ) => { console.log( value ) } }  /> */}
                <div >
                 <Row inline>
                <Col xs={1}>
                <Button variant="dark" size="lg" onClick={decrement}>
                    -
                 </Button>

                 </Col>
                 <Col xs={2}>
                  <Form.Control
                  type="text"
                  value={Quantity}
                  placeholder="0"
                  onChange={e=>setQuantity(e.target.value)}
                  ></Form.Control>
                </Col>
                <Col xs={1}>
                <Button variant="dark" size="lg" onClick={increment}>
                    +
                 </Button>

                </Col>
              </Row>
                 </div>
                <br/><br/>
                <div className="mb-2">
                  <Hrating {...props} />
                </div>
                <div className="mb-2">
                  <Button variant="secondary" size="lg" onClick={addToCart}>Add to cart</Button>
                </div>

                <h6 style={{color:"green"}}>{msg}</h6>
              </Col>
            </Row>
      </Container>
    </div>
  )

}
}

export default ProductDescription;
